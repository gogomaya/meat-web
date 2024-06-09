import {SearchParams} from "./commonTypes"

export type OrderStatus = "pending" | "paid" | "shipping" | "delivered" | "cancelled"
//결제대기, 결제완료, 배송중,배송완료,주문취소

export interface Order {
  file_name: any
  order_pk: number
  order_id: string
  user_pk: number | null              // 회원인 경우 사용자 ID, 비회원인 경우 null
  shipment_pk: number
  address_pk: number
  title: string // 한우 소고기 외 3건
  guest_name?: string // 비회원인 경우 이름(보내는분)
  guest_mobile?: string // 비회원인 경우 전화번호
  total_price?: number | null
  total_quantity?: number | null
  total_count: number
  status: OrderStatus // 결제대기, 결제완료, 배송중, 배송완료, 주문취소
  created_at: string // ISO 8601 포맷의 문자열 (예: "2024-06-02T12:34:56.789Z")
  shipfee: number
  discount: number
}

export interface OrderSearchParams extends SearchParams {
  order_pk?: number
  user_pk?: number
  status?: OrderStatus
  fromDate?: string // ISO 8601 포맷의 문자열 (예: "2024-06-01")
  toDate?: string // ISO 8601 포맷의 문자열 (예: "2024-06-02")
}


export interface OrderParams  {
  user_pk: number
  mobile: string
  order_pk: number
  address_pk: number
  payment_key: string
  guest_name: string
  guest_mobile: string
  recipient : string            // 받는사람
  recipient_mobile : string
  address : string
  address_detail : string
  pks: number[]
  list: number[]
}
