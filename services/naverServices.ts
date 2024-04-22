import {ResponseApi} from "@/types/commonTypes"
import {commonServices} from "./commonServices"

export const naverServices = {
  accessToken: async (code: string, state: string): Promise<ResponseApi> => {
    try {
      const response = await fetch(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=zlbKaCf1nrFkWFYK4rOE&client_secret=R4RQdsGnu6&code=${code}&state=${state}`
      )
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
