import {SearchParams} from "./commonTypes"

export interface Payment {
  payment_pk: number
  order_pk: number
  payment_method?: string
  status: "pending" | "completed" | "failed"
  payment_key?: string
  created_at: string
}

export interface PaymentSearchParams extends SearchParams {
  payment_pk: number
  order_pk: number
  payment_method?: string
  status?: "pending" | "completed" | "failed"
  payment_key?: string
  fromDate?: string 
  toDate?: string 
}
