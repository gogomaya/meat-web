import {ResponseApi, SearchParams} from "@/types/commonTypes"
import {commonServices} from "./commonServices"
import {BookmarkSearchParams} from "@/types/bookmarksTypes"

export const bookmarksServices = {
  bookmarksCreate: async (user_pk: number, product_pk: number): Promise<ResponseApi> => {
    try {
      const formData = new FormData()
      formData.append("user_pk", String(user_pk))
      formData.append("product_pk", String(product_pk))

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookmarks`, {
        method: "POST",
        body: formData
      })

      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  bookmarksRead: async (searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookmarks?` + new URLSearchParams({
        ...searchParams
      }))

      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  bookmarksDetail: async (searchParams: BookmarkSearchParams): Promise<ResponseApi> => {
    const user_pk = searchParams.user_pk
    const product_pk = searchParams.product_pk
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookmarks/users/${user_pk}?product_pk=${product_pk}`)
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  bookmarksDelete: async (bookmark_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookmarks/${bookmark_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  }
}
