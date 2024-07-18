"use client"
import {useRouter} from "next/navigation"
import {Button, Checkbox, Divider, IconButton, Typography, Dialog, DialogTitle, DialogActions, Skeleton} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Image from "next/image"
import {useState, useEffect, useCallback} from "react"
import {CartProduct} from "@/types/productsTypes"
import {useForm} from "react-hook-form"
import _ from "lodash"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {User} from "@/types/usersTypes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {productsServices} from "@/services/productsServices"
import {ordersServices} from "@/services/ordersServices"
import {orderItemsService} from "@/services/orderItemsServices"
import {ResponseApi} from "@/types/commonTypes"
import {Order} from "@/types/ordersTypes"

export const CartsDetailContent = ({user}: { user: User }) => {
  const router = useRouter()
  const [totalPrice, setTotalPrice] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  const [shippingFee, setShippingFee] = useState(5000)

  const cartProductsForm = useForm<{cartProducts: CartProduct[]}>({
    defaultValues: {
      cartProducts: null as unknown as CartProduct[]
    }
  })
  const {register} = cartProductsForm
  let cartProducts = cartProductsForm.getValues("cartProducts") || []
  cartProductsForm.watch("cartProducts")

  // 결제 정보 계산
  const calc = useCallback(() => {
    const cartProducts = cartProductsForm.getValues("cartProducts") || []
    // 총상품금액
    let calcTotalPrice = 0
    cartProducts.forEach( (item) => {
      calcTotalPrice += (Number(item.product.price) * item.quantity)
    })
    setTotalPrice(calcTotalPrice)
    console.log(`totalPrice : ${totalPrice}`)


    // 할인 금액
    let calcDiscountedPrice = 0
    cartProducts.forEach( (item) => {
      const productPrice = Number(item.product.price)
      const discountedPrice = Number(item.product.discounted_price) || 0
      calcDiscountedPrice += ( (productPrice - discountedPrice) * item.quantity )
    })
    setDiscountedPrice(calcDiscountedPrice)

    // 할인 주문 금액
    let calcOrderPrice = calcTotalPrice - calcDiscountedPrice
    // 150000원 이상 무료배송
    if( calcOrderPrice >= 150000 ) setShippingFee(0)
    else setShippingFee(5000)
    // 최종 결제 금액
    let calcFinalPrice = calcOrderPrice + shippingFee
    setFinalPrice(calcFinalPrice)

  }, [cartProductsForm, shippingFee, totalPrice])

  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")
    const getProductsStock = async () => {
      for(let i=0; i < cartProducts.length; i++) {
        const cartProduct = cartProducts[i]
        const fetchProductStock = async (product_pk: number) => {
          const productResult = await productsServices.productsDetail(product_pk)
          const product = productResult.data.product
          return product.stock
        }
        cartProduct.product.stock = await fetchProductStock(cartProduct.product.product_pk)
      }
      cartProductsForm.setValue("cartProducts", cartProducts)
    }
    getProductsStock()
  }, [cartProductsForm])
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")
    cartProductsForm.setValue("cartProducts", cartProducts)
    calc()
  }, [cartProductsForm, calc])
  if (cartProducts === null) {
    return <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />
  }

  // [주문하기] 클릭
  const handleOrderClick = async () => {
    // const availableProducts = cartProducts.filter((item) => !item.product.is_sold_out)
    const availableProducts = cartProducts.filter((item) => !item.product.is_sold_out)
    if (availableProducts.length === 0) {
      alert("주문할 수 있는 상품이 없습니다. 장바구니 수량을 다시 확인해주세요.")
      return
    }
    // product_pk와 quantity 추출
    const productPks = availableProducts.map((cartProduct) => cartProduct.product.product_pk).join(",")
    const quantityList = availableProducts.map((cartProduct) => cartProduct.quantity).join(",")

    // 회원
    if( user.user_pk ) {
      const orderUrl = `/order?productPks=${productPks}&quantityList=${quantityList}`
      router.push(orderUrl)
    }
    // 비회원
    else {
      const MySwal = withReactContent(Swal)

      // 👩‍💼 회원가입 유도 체크
      const result = await MySwal.fire({
        title: "회원가입 후 주문하기",
        text: "로그인 시, 더 편리하게 이용하실 수 있습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "회원가입",
        confirmButtonColor: "#271A11",
        cancelButtonText: "비회원 주문"
      })
      let guestOrder = false
      if (result.isConfirmed) {
        window.postMessage({loginPopup: "on"}, "*")
        return
      } else if (result.isDismissed) {
        // console.log("비회원 주문")
        guestOrder = true
      }
      if (result.dismiss === Swal.DismissReason.backdrop) return


      MySwal.fire({
        title: "비회원 주문",
        text: "전화번호를 입력해주세요. (- 기호없이 : 01012341234 )",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "구매하기",
        cancelButtonText: "취소",
        showLoaderOnConfirm: true,
        preConfirm: async (mobile) => {
          try {
            // TODO: 전화번호 검증 로직 필요
            return {mobile: mobile}
          } catch (error) {
            //
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          // 비회원 주문
          router.push(`/guest/order?mobile=${result.value.mobile}&productPks=${productPks}&quantityList=${quantityList}`)
        }
      })
    }


  }


  // [선택한상품만 결제하기] 클릭
  const handleCheckedPayClick = async () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")
    const checkedProducts = cartProducts.filter((product: CartProduct ) => product.checked)

    // product_pk와 quantity 추출
    const productPks = checkedProducts.map((cartProduct : CartProduct) => cartProduct.product.product_pk).join(",")
    const quantityList = checkedProducts.map((cartProduct  : CartProduct) => cartProduct.quantity).join(",")
    // console.log(`productPks : ${productPks}`)
    // console.log(`quantityList : ${quantityList}`)

    // 회원
    if( user.user_pk ) {
      const orderUrl = `/order?productPks=${productPks}&quantityList=${quantityList}`
      router.push(orderUrl)
    }
    // 비회원
    else {
      const MySwal = withReactContent(Swal)

      // 👩‍💼 회원가입 유도 체크
      const result = await MySwal.fire({
        title: "회원가입 후 주문하기",
        text: "로그인 시, 더 편리하게 이용하실 수 있습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "회원가입",
        confirmButtonColor: "#271A11",
        cancelButtonText: "비회원 주문"
      })

      let guestOrder = false
      if (result.isConfirmed) {
        window.postMessage({loginPopup: "on"}, "*")
        return
      } else if (result.isDismissed) {
        // console.log("비회원 주문")
        guestOrder = true
      }
      if (result.dismiss === Swal.DismissReason.backdrop) return

      MySwal.fire({
        title: "비회원 주문",
        text: "전화번호를 입력해주세요. (- 기호없이 : 01012341234 )",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "구매하기",
        cancelButtonText: "취소",
        showLoaderOnConfirm: true,
        // preConfirm: async (mobile) => {
        //   try {
        //     // TODO: 전화번호 검증 로직 필요
        //     return {mobile: mobile}
        //   } catch (error) {
        //   }
        // },
        preConfirm: async (mobile) => {
          try {
            // 전화번호 정규식 패턴
            const phoneRegex = /^(010\d{8})$/

            // 전화번호가 정규식 패턴에 맞는지 검증
            if (phoneRegex.test(mobile)) {
              return {mobile: mobile}
            } else {
              throw new Error("유효하지 않은 전화번호 형식입니다")
            }
          } catch (error) {
            console.error(error)
            // 에러 메시지를 사용자에게 보여주기 위해 반환
            return Swal.showValidationMessage("기호없이 전화번호를 입력해주세요.")
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          // 비회원 주문
          router.push(`/guest/order?mobile=${result.value.mobile}&productPks=${productPks}&quantityList=${quantityList}`)
        }
      })
    }
  }

  const handleClearCart = () => {
    Swal.fire({
      title: "정말 장바구니를 비우시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "네",
      cancelButtonText: "아니오"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("cartProducts", "[]")
        cartProductsForm.setValue("cartProducts", [])
        window.postMessage({cartProductsLength: "on"}, "*")
        calc()
      }
    })
  }

  return (
    <>
      <div className="cart-mobile flex items-center justify-around">
        <div className="w-full md:w-2/3 flex flex-col p-4 m-8">
          <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-4">
            <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg hidden md:block">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  <thead style={{backgroundColor: "#271A11"}} className="text-white text-center">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center">
                        선택
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center">
                        번호
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center">
                        상품명
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center">
                        가격
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-center">
                        수량
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center">
                        총금액
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center">
                        삭제
                      </th>
                    </tr>
                  </thead>
                  {cartProducts.length === 0 ? (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td colSpan={9999999} className="px-6 py-12 whitespace-nowrap">
                          <div className="flex justify-center items-center">장바구니가 비었습니다.</div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartProducts.map((cartProduct, index) => (
                        <tr key={cartProduct.product.product_pk}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Checkbox
                              {...register(`cartProducts.${index}.checked`)}
                              checked={cartProduct.checked}
                              style={{width: "20px", height: "20px"}}
                              className="rounded border-gray-300 focus:ring-indigo-500 h-4 w-4 text-indigo-600"
                              onBlur={() => {
                                localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                              }}
                              disabled={cartProduct.product.is_sold_out} // 품절이면 체크박스 비활성화
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{index + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <Image
                                  src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(cartProduct.product.image_file_name))}`}
                                  alt="상품 이미지"
                                  width={48}
                                  height={48}
                                  className="rounded"
                                />
                              </div>
                              <div className="ml-4">
                                <div>{cartProduct.product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              {cartProduct.product.discounted_price !== undefined ? (
                                <span>{cartProduct.product.discounted_price.toLocaleString()}원</span>
                              ) : (
                                <span>가격 정보 없음</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center text-center">
                              <button
                                type="button"
                                className={`px-2 py-1 border border-gray-300 rounded-l-md ${cartProduct.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => {
                                  const newQuantity = cartProduct.quantity - 1
                                  if (newQuantity < 1) return
                                  cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                  calc()
                                }}
                                disabled={cartProduct.quantity <= 1}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={cartProduct.quantity}
                                {...register(`cartProducts.${index}.quantity`, {
                                  onChange: (e) => {
                                    const newQuantity = e.target.value < 1 ? 1 : Number(e.target.value)
                                    cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                    localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                    calc()
                                  }
                                })}
                                className="w-16 p-1 border border-gray-300 text-center"
                                min="1"
                              />
                              <button
                                type="button"
                                className={`px-2 py-1 border border-gray-300 rounded-r-md ${Number(cartProduct.quantity) >= Number(cartProduct.product.stock) ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => {
                                  const newQuantity = cartProduct.quantity + 1
                                  if (newQuantity > Number(cartProduct.product.stock)) return
                                  cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                  calc()
                                }}
                                disabled={Number(cartProduct.quantity) >= Number(cartProduct.product.stock)}
                              >
                                +
                              </button>
                              {/* <span>재고확인 : {cartProduct.product.stock}</span> */}
                              {/* <button onClick={() => fetchProductStock(cartProduct.product.product_pk)}>재고확인</button> */}
                              {Number(cartProduct.quantity) >= Number(cartProduct.product.stock) && (
                                <span className="text-red-500 ml-2">재고 수량: {cartProduct.product.stock}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              {cartProduct.product.discounted_price !== undefined ? (
                                <span>{(Number(cartProduct.product.discounted_price) * cartProduct.quantity).toLocaleString()}원</span>
                              ) : (
                                <span>가격 정보 없음</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <IconButton
                              onClick={() => {
                                if (window.confirm("선택한 상품을 장바구니에서 삭제하시겠습니까?")) {
                                  cartProducts.splice(index, 1)
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                  cartProductsForm.setValue("cartProducts", cartProducts)
                                  window.postMessage({cartProductsLength: "on"}, "*")
                                  calc()
                                }
                              }}
                              style={{color: "#4F3623"}}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
              {/* 모바일 시작*/}
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg block md:hidden">
                <div className="min-w-full divide-y divide-gray-200 text-center" style={{backgroundImage: "url('/images/Bg_3.png')"}}>
                  {cartProducts.length === 0 ? (
                    <div className="bg-white divide-y divide-gray-200" style={{backgroundImage: "url('/images/Bg_3.png')"}}>
                      <div>
                        <div className="flex justify-center items-center">장바구니가 비었습니다.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white">
                      {cartProducts.map((cartProduct, index) => (
                        <>
                          <div key={cartProduct.product.product_pk} className="flex gap-3 bg-white p-4" style={{backgroundImage: "url('/images/Bg_3.png')"}}>
                            <div className="flex">
                              <Checkbox
                                {...register(`cartProducts.${index}.checked`)}
                                checked={cartProduct.checked}
                                className="rounded border-gray-300 focus:ring-indigo-500 h-4 w-4 text-indigo-600"
                                onBlur={() => {
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                }}
                                disabled={cartProduct.product.is_sold_out} // 품절이면 체크박스 비활성화
                              />
                            </div>
                            <div className="flex justify-between">
                              <div className="flex-shrink-0">
                                <Image
                                  src={`/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${encodeURIComponent(String(cartProduct.product.image_file_name))}`}
                                  alt="상품 이미지"
                                  width={64}
                                  height={64}
                                  className="rounded"
                                />
                              </div>
                              <div className="flex flex-col">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{cartProduct.product.name}</div>
                                </div>
                                <div className="flex items-center text-center">
                                  <button
                                    type="button"
                                    className={`px-2 py-1 border border-gray-300 rounded-l-md ${cartProduct.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => {
                                      const newQuantity = cartProduct.quantity - 1
                                      if (newQuantity < 1) return
                                      cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                      localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                      calc()
                                    }}
                                    disabled={cartProduct.quantity <= 1}
                                  >
                                  -
                                  </button>
                                  <input
                                    type="number"
                                    value={cartProduct.quantity}
                                    {...register(`cartProducts.${index}.quantity`)}
                                    className="w-16 p-1 border border-gray-300 text-center"
                                    min="1"
                                    onBlur={() => {
                                      const newQuantity = cartProduct.quantity < 1 ? 1 : Number(cartProduct.quantity)
                                      cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                      localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                      calc()
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className={`px-2 py-1 border border-gray-300 rounded-r-md ${Number(cartProduct.quantity) >= Number(cartProduct.product.stock) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => {
                                      const newQuantity = cartProduct.quantity + 1
                                      if (newQuantity > Number(cartProduct.product.stock)) return
                                      cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                      localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                      calc()
                                    }}
                                    disabled={Number(cartProduct.quantity) >= Number(cartProduct.product.stock)}
                                  >
                                  +
                                  </button>
                                  {/* <button
                                    onClick={() => fetchProductStock(cartProduct.product.product_pk)}
                                    className="ml-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                  >
                                  재고확인
                                  </button> */}
                                </div>
                                <div className="flex items-center justify-between p-4">
                                  <div className="text-lg font-semibold text-gray-800">
                                    {cartProduct.product.discounted_price !== undefined ? (
                                      <span>{(Number(cartProduct.product.discounted_price) * cartProduct.quantity).toLocaleString()}원</span>
                                    ) : (
                                      <span className="text-gray-500">가격 정보 없음</span>
                                    )}
                                  </div>
                                  <div>
                                    <IconButton
                                      onClick={() => {
                                        if (window.confirm("선택한 상품을 장바구니에서 삭제하시겠습니까?")) {
                                          cartProducts.splice(index, 1)
                                          localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                          cartProductsForm.setValue("cartProducts", cartProducts)
                                          window.postMessage({cartProductsLength: "on"}, "*")
                                          calc()
                                        }
                                      }}
                                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div></>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* 모바일 끝 */}
            </div>
          </div>
          <div className="product-detail-button flex-col md:flex-row md:items-center justify-start py-4 gap-2">
            <Button
              variant="contained"
              className="btn h-12 w-full md:w-[220px] text-lg md:ml-4"
              disabled={!cartProducts.find((cartProduct) => cartProduct.checked)}
              // onClick={() => {
              //   router.push(`/order?orderProducts=${encodeURIComponent(
              //     JSON.stringify(cartProducts.filter((cartProduct) => cartProduct.checked))
              //   )}`)
              // }}
              onClick={handleCheckedPayClick}
              style={{backgroundColor: "#A51C30"}}
            >
              <span>선택상품만 결제하기</span>
            </Button>
            <Button
              variant="contained"
              className="btn h-12 w-full md:w-auto text-lg"
              disabled={cartProducts.length === 0}
              onClick={handleClearCart}
              // onClick={() => setOpen(true)}
              style={{backgroundColor: "#4F3623"}}
            >
              장바구니 비우기
            </Button>
            {/* <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"정말 장바구니를 비우시겠습니까?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  아니오
                </Button>
                <Button
                  onClick={() => {
                    localStorage.setItem("cartProducts", "[]")
                    cartProductsForm.setValue("cartProducts", [])
                    window.postMessage({cartProductsLength: "on"}, "*")
                    setOpen(false)
                    calc()
                  }}
                  color="secondary"
                  autoFocus
                >
                  네
                </Button>
              </DialogActions>
            </Dialog> */}
          </div>
        </div>
        <div className="w-full md:w-1/3 pr-8 ml-4">
          <div className="bg-gray-200 shadow-md rounded-lg p-4 ml-4">
            <div className="font-bold text-lg mb-2">결제 정보</div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>총 상품 금액</span>
                {/* <span>{_.sumBy(cartProducts, (cartProduct) => {
                  return Number(cartProduct.product.discounted_price) * cartProduct.quantity
                }).toLocaleString()}원</span> */}
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>할인 금액</span>
                {/* <span>-{(_.sumBy(cartProducts, (cartProduct) => {
                  const productPrice = Number(cartProduct.product.price)
                  const discountedPrice = Number(cartProduct.product.discounted_price) || 0
                  return (productPrice - discountedPrice) * cartProduct.quantity
                }) || 0).toLocaleString()}원
                </span> */}
                <span>- {discountedPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>배송비</span>
                <span>{shippingFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-lg">최종 결제 금액</span>
                {/* <span className="font-bold text-lg">
                  {(
                    (_.sumBy(cartProducts, (cartProduct) => {
                      const productPrice = cartProduct.product ? Number(cartProduct.product.price) : 0
                      return productPrice * cartProduct.quantity
                    }) -
                    _.sumBy(cartProducts, (cartProduct) => {
                      const productPrice = cartProduct.product ? Number(cartProduct.product.price) : 0
                      const discountedPrice = cartProduct.product ? Number(cartProduct.product.discounted_price) : 0
                      return (productPrice - discountedPrice) * cartProduct.quantity
                    })
                    ) +
                    shippingFee
                  ).toLocaleString()}원
                </span> */}
                <span className="font-bold text-lg">
                  {finalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pl-4 py-2">
            <Button
              variant="contained"
              className="btn w-full h-16 text-2xl"
              disabled={cartProducts.length === 0 || cartProducts.every((item) => item.product.is_sold_out)} // 장바구니에 상품이 없거나 모든 상품이 품절인 경우
              onClick={handleOrderClick}
              style={{backgroundColor: "#A51C30"}}
            >
              주문하기
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}


// 장바구니에서 상품 삭제
export const removeFromCart = async (product_pk : number) => {
  if (typeof window == "undefined") {
    console.log("로컬 스토리지가 접근되지 않습니다.")
    return
  }
  console.log("주문한 상품 장바구니에서 삭제...")
  console.log(`product_pk : ${product_pk}`)

  // 로컬 스토리지에서 장바구니 데이터 가져오기
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]")

  // 장바구니에서 동일한 product_pk가 있는지 찾기
  const index = cartProducts.findIndex((cartProduct: CartProduct) => cartProduct.product.product_pk === product_pk)

  if (index !== -1) {
    // 해당 상품이 장바구니에 존재할 경우 삭제하기
    cartProducts.splice(index, 1)

    // 로컬 스토리지에 업데이트된 장바구니 데이터 저장
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

    // 장바구니 항목 수 업데이트
    window.postMessage({cartProductsLength: cartProducts.length}, "*")

    // console.log("상품이 장바구니에서 삭제되었습니다.")
  } else {
    // console.log("해당 상품이 장바구니에 존재하지 않습니다.")
  }
}

export const RemoveOrderItem = ({items}: { items: OrderItem[] }) => {
  items.forEach((item: OrderItem) => {
    removeFromCart(item.product_pk)
  })
  return <></>
}