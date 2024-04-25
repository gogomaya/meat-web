import {ResponseApi} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const naverServices = {
  accessToken: async (code: string, state: string): Promise<ResponseApi> => {
    try {
      let url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code"
      url += `&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`
      url += `&client_secret=${process.env.NEXT_PRIVATE_NAVER_CLIENT_SECRET}`
      url += `&code=${code}&state=${state}`
      const response = await fetch(url)
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  },
  getUser: async (accessToken: string): Promise<ResponseApi> => {
    try {
      const response = await fetch(
        "https://openapi.naver.com/v1/nid/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      return await commonServices.responseJson(response)
    } catch (error) {
      return {error}
    }
  }
}
