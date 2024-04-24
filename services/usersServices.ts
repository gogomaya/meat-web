import {redirect} from "next/navigation"
import {cookies} from "next/headers"
import {CookieUser, User} from "@/types/usersTypes"
import {commonServices} from "./commonServices"

export const usersServices = {
  loginCheck: async (loginOnly: boolean): Promise<User> => {
    let user = {} as User
    try {
      const cookieUser = (JSON.parse(cookies().get("meat_web_user")?.value || "{}")) as CookieUser
      // 로그인 전용 페이지이고 쿠키 정보가 없을 경우
      if (loginOnly && (!cookieUser.third_party || !cookieUser.access_token)) {
        redirect("/")
      }
      // 쿠키 정보가 없을 경우
      if (!cookieUser.third_party || !cookieUser.access_token) {
        return user
      }
      // access_token으로 회원 정보 받기
      if (cookieUser.third_party === "Naver") {
        const responseUser = await fetch(`${process.env.NEXT_PRIVATE_URL}/api/users/naver-login`, {
          method: "POST",
          body: JSON.stringify(cookieUser)
        })
        user = (await commonServices.responseJson(responseUser)).data
      } else if (cookieUser.third_party === "Kakao") {
        const responseUser = await fetch(`${process.env.NEXT_PRIVATE_URL}/api/users/kakao-login`, {
          method: "POST",
          body: JSON.stringify(cookieUser)
        })
        user = (await commonServices.responseJson(responseUser)).data
      }
      // 로그인 전용 페이지이고 회원 정보를 못 받은 경우
      if (loginOnly && !user.user_pk) {
        redirect("/")
      }
      return user
    } finally {
      return user
    }
  }
}
