import {ordersServices} from "@/services/ordersServices"
import {ResponseApi} from "@/types/commonTypes"
import {OrderParams} from "@/types/ordersTypes"
import ErrorPage from "../error"
import { redirect } from "next/navigation"

interface OrderResult {
  result: boolean
  order_pk: number
}

export const orderCheckout = async (searchParams: OrderParams): Promise<OrderResult> => {
  const {user_pk, pks, list, mobile} = searchParams
  let order_pk = 0
  const orderResult = {
    result : false,
    order_pk : order_pk || 0
  } as OrderResult

  console.log(`user_pk  : ${user_pk}`);
  
  // *식별키
  // 회원주문     : user_pk
  // 비회원주문   : mobile
  if( !user_pk && !mobile ) {
    let title = "주문 처리 실패"
    let text = "로그인 정보 또는 비회원 주문 정보가 있어야 주문이 가능합니다"
    let redirectUrl = "/"
    console.log(title);
    console.log(text);
    orderResult.result = false
    // ✅ 한글을 url 에 담을 때 인코딩 필수
    title = encodeURIComponent(title)
    text = encodeURIComponent(text)
    let url = `/redirect?redirectUrl=${redirectUrl}&title=${title}&text=${text}&icon=warning`
    redirect(url)
    return orderResult
  }

  try {
    const orderCreateResult = await ordersServices.ordersCreate(user_pk, "", pks, list)
    console.log("❤❤❤❤❤❤❤❤❤❤❤❤")
    console.dir(orderCreateResult)
    const responseStatus = orderCreateResult.data.status

    if (responseStatus === 200) {
      console.log("주문 등록 성공!!")
      order_pk = orderCreateResult.data.order_pk
      orderResult.result = true
      orderResult.order_pk = order_pk
    }
  } catch (error) {
    console.error("주문 생성 중 오류 발생:", error)
  }
  return orderResult
}
