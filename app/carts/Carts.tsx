"use client"
import {useRouter} from "next/navigation"
import {Button, Checkbox, Divider, IconButton, Typography, Dialog, DialogTitle, DialogActions, Skeleton} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Image from "next/image"
import {useState, useEffect} from "react"
import {CartProduct} from "@/types/productsTypes"
import {useForm} from "react-hook-form"
import _ from "lodash"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {User} from "@/types/usersTypes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const CartsDetailContent = ({user}: { user: User }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const cartProductsForm = useForm<{cartProducts: CartProduct[]}>({
    defaultValues: {
      cartProducts: null as unknown as CartProduct[]
    }
  })
  const cartProducts = cartProductsForm.getValues("cartProducts")
  const {register} = cartProductsForm
  cartProductsForm.watch("cartProducts")

  useEffect(() => {
    cartProductsForm.setValue("cartProducts", JSON.parse(localStorage.getItem("cartProducts") || "[]"))
  }, [cartProductsForm])
  if (cartProducts === null) {
    return <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />
  }
  // 전체 상품 금액, 할인 금액, 배송비 계산
  const shippingFee = 5000

  // [주문하기] 클릭
  const handleOrderClick = async () => {
    // product_pk와 quantity 추출
    const productPks = cartProducts.map((cartProduct) => cartProduct.product.product_pk).join(",")
    const quantityList = cartProducts.map((cartProduct) => cartProduct.quantity).join(",")

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
        text: "회원가입 시, 더 편리하게 이용하실 수 있습니다.",
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
    // console.log(checkedProducts)

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
        text: "회원가입 시, 더 편리하게 이용하실 수 있습니다.",
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

  return (
    <>
      <div className="cart-mobile flex items-center justify-around">
        <div className="w-full md:w-2/3 flex flex-col p-4 m-8">
          <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-4">
            <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                className="px-2 py-1 border border-gray-300 rounded-l-md"
                                onClick={() => {
                                  const newQuantity = cartProduct.quantity - 1
                                  cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity < 1 ? 1 : newQuantity)
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                }}
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
                                  cartProductsForm.setValue(`cartProducts.${index}.quantity`, cartProduct.quantity < 1 ? 1 : Number(cartProduct.quantity))
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                }}
                              />
                              <button
                                type="button"
                                className="px-2 py-1 border border-gray-300 rounded-r-md"
                                onClick={() => {
                                  const newQuantity = cartProduct.quantity + 1
                                  cartProductsForm.setValue(`cartProducts.${index}.quantity`, newQuantity)
                                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                                }}
                              >
                                +
                              </button>
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
              onClick={() => setOpen(true)}
              style={{backgroundColor: "#4F3623"}}
            >
              장바구니 비우기
            </Button>
            <Dialog
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
                  }}
                  color="secondary"
                  autoFocus
                >
                  네
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="w-full md:w-1/3 pr-8 ml-4">
          <div className="bg-gray-200 shadow-md rounded-lg p-4 ml-4">
            <div className="font-bold text-lg mb-2">결제 정보</div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>총 상품 금액</span>
                <span>{_.sumBy(cartProducts, (cartProduct) => {
                  return Number(cartProduct.product.discounted_price) * cartProduct.quantity
                }).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>할인 금액</span>
                <span>-{(_.sumBy(cartProducts, (cartProduct) => {
                  const productPrice = Number(cartProduct.product.price)
                  const discountedPrice = Number(cartProduct.product.discounted_price) || 0
                  return (productPrice - discountedPrice) * cartProduct.quantity
                }) || 0).toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>배송비</span>
                <span>{shippingFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-lg">최종 결제 금액</span>
                <span className="font-bold text-lg">
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
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pl-4 py-2">
            <Button
              variant="contained"
              className="btn w-full h-16 text-2xl"
              disabled={cartProducts.length === 0}
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