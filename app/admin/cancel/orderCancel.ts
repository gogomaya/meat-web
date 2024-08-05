import {cancellationsServices} from "@/services/cancellationsServices"
import {orderItemsService} from "@/services/orderItemsServices"
import {ordersServices} from "@/services/ordersServices"
import {paymentsServices} from "@/services/paymentsServices"
import {productsServices} from "@/services/productsServices"
import {Cancellation, CancellationSearchParams} from "@/types/cancellationsTypes"
import {ResponseApi} from "@/types/commonTypes"
import {OrderItemSearchParams} from "@/types/orderItemsTypes"
import {Order} from "@/types/ordersTypes"
import {Payment} from "@/types/paymentsTypes"
import {redirect} from "next/navigation"
import {v4 as uuidv4} from "uuid"


interface CancelResult {
  result: boolean
  order_pk: number
}

export const orderCancel = async (searchParams: CancellationSearchParams): Promise<CancelResult> => {
  const {cancellation_pk, order_pk} = searchParams
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

  // 1. 주문 취소 승인 요청
  try {
    // * cancellations - [UPDATE] (취소 - is_confirmed:1 )
    const cancelDetailResponse: ResponseApi = await cancellationsServices.cancellationDetail(cancellation_pk)
    let cancel : Cancellation = await cancelDetailResponse.data.cancellation
    cancel.is_confirmed = true
    cancel.status = "complete"
    const cancelResponse: ResponseApi = await cancellationsServices.cancellationUpdate(cancel)
    console.log("$$$$$$$$$$  주문취소 1111111. 성공 $$$$$$$$$")
  } catch (error) {
    console.error("1111111111. [결제취소 완료] 관리자-취소 상태 업데이트 중 오류 발생:", error)
  }

  // 2. 주문 내용 수정
  try {
    // * cancellations - [UPDATE] (취소 - is_confirmed:1 )
    const orderDetailResponse: ResponseApi = await ordersServices.ordersDetail(order_pk)
    let order : Order = await orderDetailResponse.data.order
    order.status = "cancelled"
    const orderResponse: ResponseApi = await ordersServices.ordersUpdate(order)
    console.log("$$$$$$$$$$  주문취소 222222. 성공 $$$$$$$$$")
  } catch (error) {
    console.error("1111111111. [결제취소 완료] 주문상태 업데이트 중 오류 발생:", error)
  }
  // try {
  //   const order = {
  //     order_pk: order_pk,
  //     status: "cancelled"
  //   } as Order
  //   const orderUpdateResult: ResponseApi = await ordersServices.ordersUpdate(order)
  //   const responseStatus = orderUpdateResult.data.status
  //   if (responseStatus === 200) {
  //     console.log("22222222. 주문 수정 성공!!")
  //   }
  // } catch (error) {
  //   console.error("2222222. [결제취소] 주문 상태 업데이트 중 오류 발생:", error)
  // }


  // 3. ⚡ 토스 결제 취소 요청
  console.log("3333333. ⚡ 토스 결제 취소 요청")
  const cancelReason = "고객이 취소를 원함"          // 취소 사유
  console.log(`결제 키 - payment_key : ${paymentKey}`)

  const widgetSecretKey = "live_gsk_4yKeq5bgrpWK5Y4ga16LVGX0lzW6"      // 💻 운영
  const encryptedSecretKey =
    "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64")

  fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
    method: "POST",
    headers: {
      Authorization: encryptedSecretKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cancelReason: cancelReason
    })
  })
    .then(async (response) => {
      if (!response.ok) {
        return response.json().then(async (error) => {
          console.log(":::::::::::: ⚡ 결제 취소 실패 ::::::::::::")
          // TODO: 결제 취소 실패 비즈니스 로직을 구현하세요.
        })
      }
      console.log(":::::::::::: ⚡ 결제 취소 성공 ::::::::::::")
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error("Fetch error:", error)
    })

  // 4. 재고 업데이트 (주문취소)
  try {
    const searchParams = {
      order_pk : order_pk,
      rowsPerPage: null,
      page: null,
      orderColumn: "order_pk",
      orderDirection: "desc",
      query: ""
    } as OrderItemSearchParams
    const orderItemsResult: ResponseApi = await orderItemsService.orderItemsRead(searchParams)
    const orderItems = orderItemsResult.data.orderItems

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new Error("주어진 order_pk로 orderItem을 조회할 수 없습니다")
    }

    // 각 order_item에 대해 재고 업데이트
    for (const orderItem of orderItems) {
      const {product_pk, quantity} = orderItem
      const productResult = await productsServices.productsDetail(product_pk)
      const product = productResult.data.product
      if (!product) {
        throw new Error(`상품을 조회할 수 없습니다: ${product_pk}`)
      }
      const updatedProduct = {
        ...product,
        stock: product.stock + quantity
      }
      // 재고 업데이트 API 호출
      const uuid = uuidv4()
      const productsUpdateResult = await productsServices.productStockUpdate(updatedProduct)
      const responseStatus = productsUpdateResult.data.status
      if (responseStatus === 200) {
        console.log("주문 취소후 재고 업데이트 성공!!")
        // 재고 수량 후 품절여부 업데이트
        if(product.stock > 0) {
          product.is_sold_out = false
        }
      } else {
        throw new Error(`해당 상품 재고를 업데이트 할 수 없습니다 : ${product_pk}.`)
      }
    }
  } catch (error) {
    console.log("44444. [주문취소] 재고 업데이트 중 오류 발생:", error)
  }

  return cancelResult
}
