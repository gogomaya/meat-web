import {loginCheck} from "@/app/users/login/loginCheck"
import {ordersServices} from "@/services/ordersServices"
import {ResponseApi} from "@/types/commonTypes"
import {redirect} from "next/navigation"

/**
 * 주문서 준비
 * - productPks : string[]
 * - quantityList : number[]
 * - 위의 두 파라미터 넘겨받고
 * - let ordersResponse: ResponseApi = {} 선언
 * - orderServices.orderCreate() 호출하면서 user_pk, guest_mobile, productPks, quantityList 전달
 * - ordersResponse 로 받아서 ordersResponse.order_pk 를 order_pk 로 선언
 * - /order/{order_pk} 로 리다이렉트
 * @param props
 * @returns
 */
const Order = async (props: {
  searchParams: {productPks: string, quantityList: string}
}) => {
  const {user} = await loginCheck(false)

  console.log("::::::::::: productPks :::::::::::")
  let productPks = props.searchParams.productPks
  console.log(productPks)
  console.log("::::::::::: quantityList :::::::::::")
  let quantityList = props.searchParams.quantityList
  console.log(quantityList)
  console.log("::::::::::: user_pk :::::::::::")
  const user_pk = user.user_pk
  console.log(user_pk)

  const pks = productPks.split(",").map(Number)
  const list = quantityList.split(",").map(Number)

  const orderCreateResult: ResponseApi = await ordersServices.ordersCreate(user_pk, "", pks, list)
  console.log("❤❤❤❤❤❤❤❤❤❤❤❤")
  console.log(orderCreateResult)
  const order_pk = orderCreateResult.data.order_pk
  const responseStatus = orderCreateResult.data.status

  if( responseStatus == 200 ) {
    console.log("주문 등록 성공!!")
    redirect(`/order/${order_pk}`)
  }

  // return (
  //   <OrderPay searchParams={{order_pk: order_pk}} />
  // )
}

export default Order