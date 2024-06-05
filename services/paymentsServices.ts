import {Payment} from "@/types/paymentsTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const paymentsServices = {
  paymentCreate: async (payment: Omit<Payment, "payment_pk" | "created_at">): Promise<ResponseApi> => {
    console.log(`order_pk : ${String(payment.order_pk)}`)
    const formData = new FormData()
    formData.append("order_pk", String(payment.order_pk))
    if (payment.payment_method) formData.append("payment_method", payment.payment_method)
    formData.append("status", payment.status)
    if (payment.pay_id) formData.append("pay_id", payment.pay_id)

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments`, {
      method: "POST",
      body: formData
    })

    const result = await commonServices.responseJson(response)
    return result
  },

  paymentRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments?` + new URLSearchParams({
      ...searchParams
    }))
    const result = await commonServices.responseJson(response)
    return result
  },

  paymentDetail: async (payment_pk: number): Promise<ResponseApi> => {
    console.log(`payment_pk : ${payment_pk}`)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/${payment_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },

  paymentUpdate: async (payment: Omit<Payment, "created_at">): Promise<ResponseApi> => {
    console.log(`payment_pk : ${payment.payment_pk}`)
    console.log(`order_pk : ${payment.order_pk}`)
    const payment_pk = payment.payment_pk
    const formData = new FormData()
    formData.append("payment_pk", String(payment.payment_pk))
    formData.append("order_pk", String(payment.order_pk))
    if (payment.payment_method) formData.append("payment_method", payment.payment_method)
    formData.append("status", payment.status)
    if (payment.pay_id) formData.append("pay_id", payment.pay_id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/${payment_pk}`, {
      method: "PUT",
      body: formData
    })
    const result = await commonServices.responseJson(response)
    return result
  },

  paymentDelete: async (payment_pk: number): Promise<ResponseApi> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/${payment_pk}`, {
      method: "DELETE"
    })
    const result = await commonServices.responseJson(response)
    return result
  }
}
