import {ResponseApi} from "@/types/commonTypes"
import {Category} from "@/types/categoryTypes"
import {commonServices} from "./commonServices"

export const categoriesServices = {
  categoriesCreate: async (category: Category): Promise<ResponseApi> => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(category)
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  categoriesList: async (): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  categoriesDelete: async (category_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/categories/${category_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  categoriesOrder: async (categories: Category[]): Promise<ResponseApi> => {
    try {
      const response = await fetch("/api/categories/order", {
        method: "PATCH",
        body: JSON.stringify(categories)
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
