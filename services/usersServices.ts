import {commonServices} from "./commonServices"
import {LoginChecked, User} from "@/types/usersTypes"
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
  usersDetail: async (user_pk: number): Promise<ResponseApi> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${user_pk}`, {
        method: "GET"
      })
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  usersUpdate: async (user: User): Promise<ResponseApi> => {
    const user_pk = user.user_pk

    const formData = new FormData()
    formData.append("user_pk", String(user.user_pk))
    formData.append("name", user.name)
    formData.append("mobile", user.mobile)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${user_pk}?`, {
        method: "PUT",
        body: formData
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
