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
  // productsOrder: async (products: Product[]): Promise<ResponseApi> => {
  //   try {
  //     const response = await fetch("/api/products/order", {
  //       method: "PATCH",
  //       body: JSON.stringify(products)
  //     })
  //     return await commonServices.responseJson(response)
  //   } catch (error) {
  //     return {error}
  //   }
  // },
  productsOrder: async (productsOrder: { product_pk: number, product_order: number }[]): Promise<ResponseApi> => {
    try {
      const response = await fetch("/api/products/order", {
        method: "PATCH",
        body: JSON.stringify(productsOrder)
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
  },
  productStockUpdate: async (product: Product): Promise<ResponseApi> => {
    const product_pk = product.product_pk
    const stock = product.stock

    // 재고 수량 추가
    const formData = new FormData()
    formData.append("stock", String(stock))

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${product_pk}`, {
      method: "PUT",
      body: formData
    })

    const result = await commonServices.responseJson(response)
    return result
  }
}
