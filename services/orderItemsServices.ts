import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {OrderItem, OrderItemSearchParams} from "@/types/orderItemsTypes"
import {commonServices} from "./commonServices"
import {productsServices} from "./productsServices"

export const orderItemsService = {
  orderItemsCreate: async (product_pk: number, order_pk: number, quantity: number): Promise<ResponseApi> => {
    try {
      // product 정보 조회
      const productResponse = await productsServices.productsDetail(product_pk)
      if (productResponse.error) {
        throw productResponse.error
      }
      const {product} = productResponse.data
      console.log(`product : ${product}`)
      // formData 생성
      const formData = new FormData()
      formData.append("product_pk", String(product_pk))
      formData.append("order_pk", String(order_pk))
      formData.append("quantity", String(quantity))
      formData.append("price", String(product.price))
      // 주문 항목 생성 요청
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orderItems`, {
        method: "POST",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },

  orderItemsRead: async (searchParams: OrderItemSearchParams): Promise<ResponseApi> => {
    try {
      // 필요한 프로퍼티만 추출하여 URLSearchParams 생성
      const queryParams = new URLSearchParams()
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value))
        }
      })
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orderItems?${queryParams}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },

  orderItemsDetail: async (order_item_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orderItems/${order_item_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },

  orderItemsUpdate: async (orderItem: OrderItem): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orderItems`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderItem)
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },

  orderItemsDelete: async (order_item_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orderItems?order_item_pk=${order_item_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
