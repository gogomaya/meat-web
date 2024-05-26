import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {Product} from "@/types/productsTypes"
import {commonServices} from "./commonServices"

export const productsServices = {
  productsCreate: async (product: Product, uuid: string): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key,
          key === "image" ? value[0] : value
        )
      })
      const response = await fetch(`/api/products?uuid=${uuid}`, {
        method: "POST",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  productsRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?` + new URLSearchParams({
        ...searchParams
      }))
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  productsHome: async (): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/home`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  productsDetail: async (product_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${product_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  productsVisitedCount: async (product_pk: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${product_pk}`, {
        method: "PUT"
      })
    } catch (error) {
      throw error
    }
  },
  productsDelete: async (product_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/products/${product_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  productsUpdate: async (product: Product, uuid: string): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key,
          key === "image" ? (value[0] || "") : value
        )
      })
      const response = await fetch(`/api/products/${product.product_pk}?uuid=${uuid}`, {
        method: "PATCH",
        body: formData
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
