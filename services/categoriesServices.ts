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
  categoriesUpdate: async (category: Omit<Category, "created_at">): Promise<ResponseApi> => {
    const category_pk = category.category_pk
    const formData = new FormData()
    if (category.name) formData.append("name", category.name)
    if (category.id) formData.append("id", category.id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories/${category_pk}`, {
      method: "PUT",
      body: formData
    })
    const result = await commonServices.responseJson(response)
    return result
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
