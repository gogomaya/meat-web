import {commonServices} from "./commonServices"
import {LoginChecked} from "@/types/usersTypes"
import {ResponseApi, SearchParams} from "@/types/commonTypes"

export const usersServices = {
  serverUsersCookie: (loginChecked: LoginChecked) => {
    return `meat_web_user=${encodeURIComponent(JSON.stringify(loginChecked.cookieUser))}`
  },
  usersLogout: async (): Promise<ResponseApi> => {
    try {
      const response = await fetch("/api/users/logout")
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  usersRead: async (loginChecked: LoginChecked, searchParams: SearchParams): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users?` + new URLSearchParams({
        ...searchParams
      }), {
        headers: {
          cookie: usersServices.serverUsersCookie(loginChecked)
        }
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      throw error
    }
  },
  usersDelete: async (user_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`/api/users/${user_pk}`, {
        method: "DELETE"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
