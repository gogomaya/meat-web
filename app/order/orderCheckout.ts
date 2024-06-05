import {ordersServices} from "@/services/ordersServices"
import {ResponseApi} from "@/types/commonTypes"
import {OrderParams} from "@/types/ordersTypes"

interface OrderResult {
  result: false
  order_pk: 0
}

export const orderCheckout = async (searchParams: OrderParams): Promise<OrderResult> => {
  const {user_pk, pks, list} = searchParams
  let result = false
  let order_pk = 0
  try {
    const orderCreateResult: ResponseApi = await ordersServices.ordersCreate(user_pk, "", pks, list)
    console.log("❤❤❤❤❤❤❤❤❤❤❤❤")
    console.log(orderCreateResult)

    const responseStatus = orderCreateResult.data.status

    if (responseStatus === 200) {
      console.log("주문 등록 성공!!")
      order_pk = orderCreateResult.data.order_pk
      result = true
    }
  } catch (error) {
    console.error("주문 생성 중 오류 발생:", error)
  }
  const orderResult = {
    result : result || false,
    order_pk : order_pk || 0
  } as OrderResult
  return orderResult
}
