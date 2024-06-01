import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const ordersServices = {
  ordersRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders?` + new URLSearchParams({
        ...searchParams
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  ordersDetail: async (order_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${order_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  }
}