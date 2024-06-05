import {Shipment} from "@/types/shipmentsTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const shipmentsServices = {
  shipmentCreate: async (shipment: Omit<Shipment, "shipment_pk" | "created_at">): Promise<ResponseApi> => {
    console.log(`address_pk : ${String(shipment.address_pk)}`)
    const formData = new FormData()
    formData.append("address_pk", String(shipment.address_pk))
    formData.append("recipient", shipment.recipient)
    formData.append("recipient_mobile", shipment.recipient_mobile)
    if (shipment.delivery_request) formData.append("delivery_request", shipment.delivery_request)
    if (shipment.delivery_method) formData.append("delivery_method", shipment.delivery_method)
    if (shipment.tracking_no) formData.append("tracking_no", shipment.tracking_no)
    if (shipment.ship_company) formData.append("ship_company", shipment.ship_company)
    if (shipment.status) formData.append("status", shipment.status)

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/shipments`, {
      method: "POST",
      body: formData
    })

    const result = await commonServices.responseJson(response)
    return result
  },

  shipmentRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/shipments?` + new URLSearchParams({
      ...searchParams
    }))
    const result = await commonServices.responseJson(response)
    return result
  },

  shipmentDetail: async (shipment_pk: number): Promise<ResponseApi> => {
    console.log(`shipment_pk : ${shipment_pk}`)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/shipments/${shipment_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },

  shipmentUpdate: async (shipment: Omit<Shipment, "created_at">): Promise<ResponseApi> => {
    console.log(`shipment_pk : ${shipment.shipment_pk}`)
    console.log(`address_pk : ${shipment.address_pk}`)
    const shipment_pk = shipment.shipment_pk
    const formData = new FormData()
    formData.append("shipment_pk", String(shipment.shipment_pk))
    formData.append("address_pk", String(shipment.address_pk))
    formData.append("recipient", shipment.recipient)
    formData.append("recipient_mobile", shipment.recipient_mobile)
    if (shipment.delivery_request) formData.append("delivery_request", shipment.delivery_request)
    if (shipment.delivery_method) formData.append("delivery_method", shipment.delivery_method)
    if (shipment.tracking_no) formData.append("tracking_no", shipment.tracking_no)
    if (shipment.ship_company) formData.append("ship_company", shipment.ship_company)
    if (shipment.status) formData.append("status", shipment.status)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/shipments/${shipment_pk}`, {
      method: "PUT",
      body: formData
    })
    const result = await commonServices.responseJson(response)
    return result
  },

  shipmentDelete: async (shipment_pk: number): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/shipments/${shipment_pk}`, {
      method: "DELETE"
    })
    const result = await commonServices.responseJson(response)
    return result
  }
}
