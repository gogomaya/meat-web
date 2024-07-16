import {cancellationsServices} from "@/services/cancellationsServices"
import {ordersServices} from "@/services/ordersServices"
import {Cancellation} from "@/types/cancellationsTypes"
import {ResponseApi} from "@/types/commonTypes"
import {Order, OrderParams} from "@/types/ordersTypes"


interface CancelResult {
  result: boolean
  order_pk: number
}

export const orderCancel = async (searchParams: OrderParams): Promise<CancelResult> => {
  console.log(`searchParams : ${searchParams}`)

  // [사용자] - 주문 취소 요청
  const {order_pk} = searchParams
  const cancelReason = "고객이 취소를 원함"          // 취소 사유
  const cancelResult = {
    result : false,
    order_pk : order_pk || 0
  } as CancelResult

  try {
    // 1️⃣ cancellations - [INSERT] (취소 - type:cancel, status:pending )
    // 주문 취소 요청 - status : pending
    const cancellation = {
      order_pk : order_pk,
      type: "cancel",
      status: "pending",
      description: cancelReason,
      is_confirmed: false,
      is_refund: false
    } as Cancellation
    const cancellationResponse: ResponseApi = await cancellationsServices.cancellationCreate(cancellation)
    console.log(`cancellationResponse : ${cancellationResponse}`)
    console.log(`cancellationResponse : ${cancellationResponse.data.status}`)

    // 2️⃣ orders        - [UPDATE] (취소 - status:cancelled)
    // 주문 상태 변경
    const orderDetailResponse: ResponseApi = await ordersServices.ordersDetail(order_pk)
    let order : Order = await orderDetailResponse.data.order
    order.status = "cancelling"
    const orderResponse: ResponseApi = await ordersServices.ordersUpdate(order)
    console.log(`orderResponse : ${orderResponse}`)
    console.log(`orderResponse : ${orderResponse.data.status}`)

    cancelResult.result = true
  } catch (error) {
    console.log("[사용자] 주문 취소 시 에러")
    console.log(error)
    cancelResult.result = false
  }
  return cancelResult
}
