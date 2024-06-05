import {ordersServices} from "@/services/ordersServices"
import {ResponseApi} from "@/types/commonTypes"
import {Order, OrderParams} from "@/types/ordersTypes"


/**
 * - 배송 등록하고 shipment_pk 돌려주고
 */
interface OrderResult {
  result: false
  order_pk: 0
  shipment_pk: 0
  address_pk: 0
}

export const orderSuccess = async (searchParams: OrderParams): Promise<OrderResult> => {
  const {user_pk, order_pk, address_pk} = searchParams
  let result = false
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
