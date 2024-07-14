import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"
import {Cancellation} from "@/types/cancellationsTypes"

export const cancellationsServices = {
  cancellationCreate: async (cancellation: Omit<Cancellation, "cancellation_pk" | "created_at">): Promise<ResponseApi> => {
    console.log(`order_pk: ${cancellation.order_pk}`)
    const formData = new FormData()
    formData.append("order_pk", String(cancellation.order_pk))
    formData.append("type", cancellation.type)
    formData.append("status", cancellation.status)
    formData.append("description", cancellation.description || "")
    formData.append("is_confirmed", String(cancellation.is_confirmed))
    formData.append("is_refund", String(cancellation.is_refund))
    formData.append("account_number", cancellation.account_number || "")
    formData.append("bank_name", cancellation.bank_name || "")
    formData.append("depositor", cancellation.depositor || "")

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cancellations`, {
      method: "POST",
      body: formData
    })

    const result = await commonServices.responseJson(response)
    return result
  },

  cancellationRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cancellations?` + new URLSearchParams({
      ...searchParams
    }))

    const result = await commonServices.responseJson(response)
    return result
  },

  cancellationDetail: async (cancellation_pk: number): Promise<ResponseApi> => {
    console.log(`cancellation_pk: ${cancellation_pk}`)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cancellations/${cancellation_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },

  cancellationUpdate: async (cancellation: Cancellation): Promise<ResponseApi> => {
    console.log(`cancellation_pk: ${cancellation.cancellation_pk}`)
    const cancellation_pk = cancellation.cancellation_pk
    const formData = new FormData()
    formData.append("cancellation_pk", String(cancellation_pk))
    formData.append("order_pk", String(cancellation.order_pk))
    formData.append("type", cancellation.type)
    formData.append("status", cancellation.status)
    formData.append("description", cancellation.description || "")
    formData.append("is_confirmed", String(cancellation.is_confirmed))
    formData.append("is_refund", String(cancellation.is_refund))
    formData.append("account_number", cancellation.account_number || "")
    formData.append("bank_name", cancellation.bank_name || "")
    formData.append("depositor", cancellation.depositor || "")

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cancellations/${cancellation_pk}`, {
      method: "PUT",
      body: formData
    })

    const result = await commonServices.responseJson(response)
    return result
  },

  cancellationDelete: async (cancellation_pk: number): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cancellations/${cancellation_pk}`, {
      method: "DELETE"
    })

    const result = await commonServices.responseJson(response)
    return result
  },

  cancellationAll: async (searchParams: SearchParams): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/cancellations?` + new URLSearchParams({
      ...searchParams
    }))

    const result = await commonServices.responseJson(response)
    return result
  }



}

