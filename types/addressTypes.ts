import {SearchParams} from "./commonTypes"

export interface Address {
  address_pk: number
  user_pk?: number
  mobile: string
  recipient: string
  address: string
  address_detail: string
  is_primary?: boolean
  created_at: string
}


export interface AddressSearchParams extends SearchParams {
  address_pk?: number
  product_pk?: number
  user_pk?: number
  fromDate?: string
  toDate?: string
}