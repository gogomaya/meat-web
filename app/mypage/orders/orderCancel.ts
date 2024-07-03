import {cancellationsServices} from "@/services/cancellationsServices"
import {ordersServices} from "@/services/ordersServices"
import {paymentsServices} from "@/services/paymentsServices"
import {Cancellation} from "@/types/cancellationsTypes"
import {ResponseApi} from "@/types/commonTypes"
import {Order, OrderParams} from "@/types/ordersTypes"
import {Payment} from "@/types/paymentsTypes"
import {redirect} from "next/navigation"


interface CancelResult {
  result: boolean
  order_pk: number
}

export const orderCancel = async (searchParams: OrderParams): Promise<CancelResult> => {
  console.log(`searchParams : ${searchParams}`)

  const {order_pk} = searchParams
  let payment = {} as Payment
  const cancelResult = {
    result : false,
    order_pk : order_pk || 0
  } as CancelResult

  // order_pk 로 결제 내역 조회
  console.log("결제 내역 조회...")
  const paymentResponse: ResponseApi = await paymentsServices.paymentDetailByOrderPk(order_pk)
  const responseStatus = paymentResponse.data.status
  if( responseStatus == 200 ) {
    console.log("결제 내역 조회 성공!!")
    console.log(paymentResponse.data.payment)
    console.dir(paymentResponse.data.payment)
    payment = paymentResponse.data.payment
  }

  // 결제 내역 없으면, redirect
  if ( !payment || !payment.payment_key ) {
    let title = "주문 취소 실패"
    let text = "죄송합니다. 결제 내역이 조회되지 않습니다. 전화 또는 고객센터 문의를 남겨주시면 신속하게 처리 도와드리겠습니다."
    let redirectUrl = "/"
    cancelResult.result = false
    // ✅ 한글을 url 에 담을 때 인코딩 필수
    title = encodeURIComponent(title)
    text = encodeURIComponent(text)
    let url = `/redirect?redirectUrl=${redirectUrl}&title=${title}&text=${text}&icon=warning`
    redirect(url)
    return cancelResult
  }


  const paymentKey = payment.payment_key           // 결제 키

  // ---------------------------------------------------------------------------------------

  // ⚡ 토스 결제 취소 요청
  console.log("⚡ 토스 결제 취소 요청")


  const cancelReason = "고객이 취소를 원함"          // 취소 사유

  console.log(`결제 키 - payment_key : ${paymentKey}`)

  fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
    method: "POST",
    headers: {
      Authorization: "Basic dGVzdF9nc2tfZG9jc19PYVB6OEw1S2RtUVhrelJ6M3k0N0JNdzY6",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cancelReason: cancelReason
    })
  })
    // 취소 내역 등록 [cancellations]
    .then(async (response) => {
      if (!response.ok) {
        return response.json().then(async (error) => {
          console.log(":::::::::::: ⚡ 결제 취소 실패 ::::::::::::")
          // TODO: 결제 취소 실패 비즈니스 로직을 구현하세요.
          // 결제 취소 실패 시 - status : pending
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
          console.log(error)
        })
      }

      if(response.ok) {
        console.log(":::::::::::: ⚡ 결제 취소 성공 ::::::::::::")
        // 결제 취소 성공 비즈니스 로직
        // 결제 취소 성공 시 - status : complete
        const cancellation = {
          order_pk : order_pk,
          type: "cancel",
          status: "complete",
          description: cancelReason,
          is_confirmed: true,
          is_refund: true
        } as Cancellation
        const cancellationResponse: ResponseApi = await cancellationsServices.cancellationCreate(cancellation)
        console.log(`cancellationResponse : ${cancellationResponse}`)
        console.log(`cancellationResponse : ${cancellationResponse.data.status}`)

        // 주문 상태 변경
        const orderDetailResponse: ResponseApi = await ordersServices.ordersDetail(order_pk)
        let order : Order = await orderDetailResponse.data.order
        order.status = "cancelled"
        const orderResponse: ResponseApi = await ordersServices.ordersUpdate(order)
        console.log(`orderResponse : ${orderResponse}`)
        console.log(`orderResponse : ${orderResponse.data.status}`)

        // TODO: 재고 업데이트 (주문취소)
        // order_pk 로 order_items 리스트 조회
        // ➡ 반복 (order_item - product_pk, quantity)
        // ➡ 상품 재고 (quantity)만큼 감소

        return response.json()
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error("Fetch error:", error)
    })

  // ⚡ 토스 결제 취소 성공 확인






  return cancelResult
}
