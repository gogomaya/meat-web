import {orderItemsService} from "@/services/orderItemsServices"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"


// 주문pk 로 주문 항목 리스트 조회
export const orderItemsByOrderPk = async (order_pk : number): Promise<OrderItem[]> => {
  const searchParams = {
    order_pk : order_pk,
    rowsPerPage: null,
    page: null,
    orderColumn: "order_pk",
    orderDirection: "desc",
    query: ""
  } as OrderItemSearchParams
  const orderItemsResponse = await orderItemsService.orderItemsRead(searchParams)
  const orderItems = await orderItemsResponse.data.orderItems
  return orderItems
}