import {CancellationStatus} from "@/types/cancellationsTypes"
import {OrderStatus} from "@/types/ordersTypes"
import {ShipmentStatus} from "@/types/shipmentsTypes"

/**
 * 주문 상태 변환 함수
 * @param status 주문상태
 * @returns
 */
export function getOrderStatusMeaning(status: OrderStatus): string {
  switch (status) {
  case "pending":return "결제대기"
  case "paid":return "결제완료"
  case "shipping":return "배송중"
  case "delivered":return "배송완료"
  case "cancelling":return "취소중"
  case "cancelled":return "취소완료"
  default:return ""
  }
}


/**
 * 배송 상태 변환 함수
 * @param status 배송상태
 * @returns
 */
export function getShipmentStatusMeaning(status: ShipmentStatus): string {
  switch (status) {
  case "pending":return "배송준비"
  case "start":return "배송시작"
  case "shipping":return "배송중"
  case "delivered":return "배송완료"
  case "cancelled":return "배송취소"
  default:return ""
  }
}
/**
 * 배송 상태별 메시지
 * @param status 배송상태
 * @returns
 */
export function getShipmentMessage(status: ShipmentStatus): string {
  switch (status) {
  case "pending":return "배송준비 중 입니다."
  case "start":return "배송시작되었습니다."
  case "shipping":return "배송중입니다."
  case "delivered":return "배송완료 되었습니다."
  case "cancelled":return "배송취소 되었습니다. "
  default:return ""
  }
}


/**
 * 취소 상태 변환 함수
 * @param status 취소상태
 * @returns
 */
export function getCancellationStatusMeaning(status: CancellationStatus): string {
  switch (status) {
  case "pending":return "취소대기"
  case "complete":return "처리완료"
  default:return ""
  }
}

/**
 * created_at 시각 변환 함수
 * @params created_at 시각
 * @returns
 */
export function getFormattedDate(created_at: string) {
  const date = new Date(created_at)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}