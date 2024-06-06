import {ordersServices} from "@/services/ordersServices"
import { paymentsServices } from "@/services/paymentsServices"
import { shipmentsServices } from "@/services/shipmentsServices"
import {ResponseApi} from "@/types/commonTypes"
import {Order, OrderParams} from "@/types/ordersTypes"
import { Payment } from "@/types/paymentsTypes"
import { Shipment } from "@/types/shipmentsTypes"


/**
 * - 배송 등록하고 shipment_pk 돌려주고
 */
interface PaySuccessResult {
  result: false
  shipmentResult: false
  orderResult: false
  paymentResult: false
  order_pk: 0
  shipment_pk: 0
  address_pk: 0
  payment_pk: 0
}

export const orderSuccess = async (searchParams: OrderParams): Promise<PaySuccessResult> => {
  const {order_pk, address_pk, payment_key} = searchParams
  let result = false
  let shipmentResult = false
  let orderResult = false
  let paymentResult = false
  let shipment_pk = 0
  let payment_pk = 0

  // 배송 등록
  try {
    const shipment = {
      address_pk: address_pk,
      status: "pending"
    } as Shipment
    const shipmentCreateResult: ResponseApi = await shipmentsServices.shipmentCreate(shipment)
    const responseStatus = shipmentCreateResult.data.status
    if( responseStatus == 200 ) {
      console.log("배송 등록 성공!!")
      shipmentResult = true
      shipment_pk = shipmentCreateResult.data.shipment_pk
    }
  } catch (error) {
    console.error("[결제완료] 배송 등록 중 오류 발생:", error)
  }


  // 주문 업데이트
  console.log("::::::::::::::: 주문 업데이트 ::::::::::::::");
  console.log(`order_pk : ${order_pk}`);
  console.log(`address_pk : ${address_pk}`);
  
  
  try {
    const order = {
      order_pk: order_pk,
      address_pk: address_pk,
      status: "paid"
    } as Order
    const orderUpdateResult: ResponseApi = await ordersServices.ordersUpdate(order)
    console.log("❤❤❤❤❤❤❤❤❤❤❤❤")
    console.log(orderUpdateResult)
    const responseStatus = orderUpdateResult.data.status
    if (responseStatus === 200) {
      console.log("주문 수정 성공!!")
      orderResult = true
    }
  } catch (error) {
    console.error("[결제완료] 주문 업데이트 중 오류 발생:", error)
  }


  // 결제 등록
  try {
    const payment = {
      order_pk : order_pk,
      status : "completed",
      payment_key : payment_key
    } as Payment
    const paymentCreateResult: ResponseApi = await paymentsServices.paymentCreate(payment)
    const responseStatus = paymentCreateResult.data.status
    if( responseStatus == 200 ) {
      console.log("결제 등록 성공!!")
      paymentResult = true
      payment_pk = paymentCreateResult.data.payment_pk
    }
  } catch (error) {
    console.error("[결제완료] 결제 등록 중 오류 발생:", error)
  }


  result = shipmentResult && orderResult && paymentResult
  // 결과
  const paySuccessResult = {
    result : result || false,
    shipmentResult : shipmentResult || false,
    orderResult : orderResult || false,
    paymentResult : paymentResult || false,
    order_pk : order_pk || 0,
    payment_pk : payment_pk || 0
  } as PaySuccessResult
  return paySuccessResult
}
