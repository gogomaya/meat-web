import {OrderStatus} from "@/types/ordersTypes"

export function getOrderStatusMeaning(status: OrderStatus): string {
  switch (status) {
  case "pending":return "결제대기"
  case "paid":return "결제완료"
  case "shipping":return "배송중"
  case "delivered":return "배송완료"
  case "cancelled":return "주문취소"
  default:return ""
  }
}
