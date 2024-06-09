import {loginCheck} from "@/app/users/login/loginCheck"
import {Order, OrderParams} from "@/types/ordersTypes"
import {redirect} from "next/navigation"
import {orderSuccess} from "../orderSuccess"
import {orderItemsByOrderPk} from "../orderUtil"
import {OrderItem} from "@/types/orderItemsTypes"
import {RemoveOrderItem} from "@/app/carts/Carts"

/**
 * 결제 성공
 * TODO:
 * - 토스에 결제 승인 요청
 * COMPLETE:
 * - 배송 등록 ✅
 * - 주문 업데이트 ✅
 * - 결제 등록 ✅
 * - 결제 성공 UI ✅
 *
 * @param props
 * @returns
 */
const OrderSuccess = async (props: {
  params: {},   // 경로 변수
  searchParams: {
    orderPk : number,
    orderId : string,
    addressPk : number,
    paymentType : string,
    paymentKey : string,
    amount : number
  }              // 쿼리 스트링 파라미터
}) => {
  const {user} = await loginCheck(false)

  const order_pk = props.searchParams.orderPk
  const order_id = props.searchParams.orderId
  const address_pk = props.searchParams.addressPk
  const paymentType = props.searchParams.paymentType
  const payment_key = props.searchParams.paymentKey
  const amount = props.searchParams.amount

  console.log(":::::::::: 결제 완료 데이터 ::::::::::")
  console.log(`orderPk : ${order_pk}`)
  console.log(`orderId : ${order_id}`)
  console.log(`addressPk : ${address_pk}`)
  console.log(`paymentType : ${paymentType}`)
  console.log(`paymentKey : ${payment_key}`)
  console.log(`amount : ${amount}`)
  console.log("::::::::::::::::::::::::::::::::::::")

  const params = {
    order_pk : order_pk,
    address_pk : address_pk,
    payment_key : payment_key

  } as OrderParams
  const paySuccessResult = await orderSuccess(params)


  let items : OrderItem[] = []
  if( paySuccessResult.result ) {
    console.log("결제 성공!")
    console.log(`result : ${paySuccessResult.result}`)
    console.log(`payment_pk : ${paySuccessResult.payment_pk}`)
    redirect(`/payments/${paySuccessResult.payment_pk}`)
  }

  return (
    <>
      <h3>로딩중</h3>
    </>
  )
}

export default OrderSuccess
