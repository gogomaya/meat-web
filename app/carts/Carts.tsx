"use client"
import {useRouter} from "next/navigation"
import {Button, Checkbox, Divider, IconButton, Typography, Dialog, DialogTitle, DialogActions, Skeleton} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Image from "next/image"
import {useState, useEffect} from "react"
import {CartProduct} from "@/types/productsTypes"
import {useForm} from "react-hook-form"
import _ from "lodash"

export const CartsDetailContent = () => {
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
  // 전체 상품 금액, 할인 금액, 배송비 계산 (임시 값)
  // const totalAmount = 100000
  const discountAmount = 0
  const shippingFee = 3000


  const handleOrderClick = () => {
    // product_pk와 quantity 추출
    const productPks = cartProducts.map((cartProduct) => cartProduct.product.product_pk).join(",")
    const quantityList = cartProducts.map((cartProduct) => cartProduct.quantity).join(",")

    // URL 생성
    const orderUrl = `/order?productPks=${productPks}&quantityList=${quantityList}`
    console.log(`productPks : ${productPks}`)
    console.log(`quantityList : ${quantityList}`)
    console.log(`orderUrl : ${orderUrl}`)

    // 이동
    router.push(orderUrl)
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
                            <div>{cartProduct.product.price.toLocaleString()}원</div>
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
                            <div>{(Number(cartProduct.product.price) * cartProduct.quantity).toLocaleString()}원</div>
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
              <div className="cart-mobile flex flex-col md:flex-row md:items-center justify-start space-y-4 py-4 md:space-y-0 md:space-x-2">
                <Button
                  variant="contained"
                  className="btn h-12 w-full md:w-1/6 text-lg md:ml-4"
                  disabled={!cartProducts.find((cartProduct) => cartProduct.checked)}
                  onClick={() => {
                    router.push(`/order?orderProducts=${encodeURIComponent(
                      JSON.stringify(cartProducts.filter((cartProduct) => cartProduct.checked))
                    )}`)
                  }}
                  style={{backgroundColor: "#A51C30"}}
                >
                  <span>선택상품만 결제하기</span>
                </Button>
                <div className="w-full md:w-auto">
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
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 pr-8 ml-4">
          <div className="bg-gray-200 shadow-md rounded-lg p-4 ml-4">
            <div className="font-bold text-lg mb-2">결제 정보</div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>총 상품 금액</span>
                <span>{_.sumBy(cartProducts, (cartProduct) => {
                  return Number(cartProduct.product.price) * cartProduct.quantity
                }).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>할인 금액</span>
                <span>-{discountAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>배송비</span>
                <span>{shippingFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-lg">최종 결제 금액</span>
                <span className="font-bold text-lg">{(_.sumBy(cartProducts, (cartProduct) => {
                  return Number(cartProduct.product.price) * cartProduct.quantity
                }) - discountAmount + shippingFee).toLocaleString()}원</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pl-4 py-2">
            <Button
              variant="contained"
              className="btn w-full h-16 text-2xl"
              disabled={cartProducts.length === 0}
              // onClick={() => {
              //   router.push(`/order?orderProducts=${encodeURIComponent(JSON.stringify(cartProducts))}`)
              // }}
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