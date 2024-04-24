import {ResponseApi} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const kakaoServices = {
  accessToken: async (code: string, state: string): Promise<ResponseApi> => {
    try {
      let url = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code"
      url += `&client_id=${process.env.NEXT_PRIVATE_KAKAO_REST_API_KEY}`
      url += `&redirect_uri=${process.env.NEXT_PRIVATE_URL}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`
      url += `&client_secret=${process.env.NEXT_PRIVATE_KAKAO_CLIENT_SECRET}`
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
        "https://kapi.kakao.com/v2/user/me", {
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
