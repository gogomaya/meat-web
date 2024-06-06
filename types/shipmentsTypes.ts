import {SearchParams} from "./commonTypes"

export type ShipmentStatus = "pending" | "start" | "shipping" | "delivered" | "cancelled"

export interface Shipment {
  shipment_pk: number
  address_pk: number
  recipient: string
  recipient_mobile: string
  delivery_request?: string
  delivery_method?: string
  tracking_no?: string
  ship_company?: string
  status: ShipmentStatus
  created_at: string
}

export interface ShipmentSearchParams extends SearchParams {
  shipment_pk: number
  address_pk: number
  recipient?: string
  recipient_mobile?: string
  delivery_request?: string
  delivery_method?: string
  tracking_no?: string
  ship_company?: string
  status?: ShipmentStatus
  fromDate?: string // ISO 8601 format (e.g., "2024-06-01")
  toDate?: string // ISO 8601 format (e.g., "2024-06-02")
}
