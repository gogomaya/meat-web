import {SearchParams} from "./commonTypes"

export interface Address {
  address_pk: number
  user_pk?: number
  mobile: string
  recipient: string
  address: string
  address_detail: string
  is_primary?: number
  created_at: string
}


export interface AddressSearchParams extends SearchParams {
  address_pk: number
  user_pk?: number
  mobile: string
  recipient: string
  address: string
  address_detail: string
  is_primary?: number
  fromDate?: string // ISO 8601 포맷의 문자열 (예: "2024-06-01")
  toDate?: string // ISO 8601 포맷의 문자열 (예: "2024-06-02")
}
