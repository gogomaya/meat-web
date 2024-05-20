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
  return (
    <>
      <div className="flex flex-col py-4">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-4">
          <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      선택
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상품명
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가격
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      수량
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      총금액
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      삭제
                    </th>
                  </tr>
                </thead>
                {cartProducts.length === 0 ? (
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td colSpan={7} className="px-6 py-12 whitespace-nowrap">
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
                              <Typography variant="body1" gutterBottom>{cartProduct.product.name}</Typography>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Typography variant="body1" gutterBottom>{cartProduct.product.price.toLocaleString()}원</Typography>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={cartProduct.quantity}
                              {...register(`cartProducts.${index}.quantity`)}
                              className="w-16 p-1 border border-gray-300 rounded-md text-center"
                              min="1"
                              onBlur={() => {
                                cartProductsForm.setValue(`cartProducts.${index}.quantity`, cartProduct.quantity < 1 ? 1 : Number(cartProduct.quantity))
                                localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Typography variant="body1" gutterBottom>{(Number(cartProduct.product.price) * cartProduct.quantity).toLocaleString()}원</Typography>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <IconButton onClick={() => {
                            if (window.confirm("선택한 상품을 장바구니에서 삭제하시겠습니까?")) {
                              cartProducts.splice(index, 1)
                              localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                              cartProductsForm.setValue("cartProducts", cartProducts)
                              window.postMessage({cartProductsLength: "on"}, "*")
                            }
                          }} color="secondary">
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
        <Divider className="my-4" sx={{border: "1px solid secondary"}} />
        <div className="flex flex-col items-end space-y-4">
          <Typography variant="h5" gutterBottom>
            총금액: {_.sumBy(cartProducts, (cartProduct) => {
              return Number(cartProduct.product.price) * cartProduct.quantity
            }).toLocaleString()}원
          </Typography>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
        <Button
          variant="contained"
          color="secondary"
          className="btn"
          disabled={!cartProducts.find((cartProduct) => cartProduct.checked)}
          onClick={() => {
            router.push(`/order?orderProducts=${encodeURIComponent(
              JSON.stringify(cartProducts.filter((cartProduct) => {
                return cartProduct.checked
              }))
            )}`)
          }}
        >
          선택상품만 결제하기
        </Button>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className="btn"
            disabled={cartProducts.length === 0}
            onClick={() => setOpen(true)}
          >
            장바구니 비우기
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"정말 장바구니를 비우시겠습니까?"}</DialogTitle>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                아니오
              </Button>
              <Button onClick={() => {
                localStorage.setItem("cartProducts", "[]")
                cartProductsForm.setValue("cartProducts", [])
                window.postMessage({cartProductsLength: "on"}, "*")
                setOpen(false)
              }} color="secondary" autoFocus>
                네
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-4 py-3">
        <Button
          variant="contained"
          color="primary"
          className="btn"
          disabled={cartProducts.length === 0}
          onClick={() => {
            router.push(`/order?orderProducts=${encodeURIComponent(JSON.stringify(cartProducts))}`)
          }}
        >
          바로구매
        </Button>
      </div>
    </>
  )
}