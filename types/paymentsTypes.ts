import {SearchParams} from "./commonTypes"

export interface Payment {
  payment_pk: number
  order_pk: number
  payment_method?: string
  status: "pending" | "completed" | "failed"
  pay_id?: string
  created_at: string
}

export interface PaymentSearchParams extends SearchParams {
  payment_pk: number
  order_pk: number
  payment_method?: string
  status?: "pending" | "completed" | "failed"
  pay_id?: string
  fromDate?: string // ISO 8601 format (e.g., "2024-06-01")
  toDate?: string // ISO 8601 format (e.g., "2024-06-02")
}
