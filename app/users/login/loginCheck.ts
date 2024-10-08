import {redirect} from "next/navigation"
import {cookies} from "next/headers"
import {CookieUser, LoginChecked} from "@/types/usersTypes"
import {commonServices} from "@/services/commonServices"

export const loginCheck = async (loginOnly: boolean): Promise<LoginChecked> => {
  const loginChecked = {
    user: {},
    cookieUser: {}
  } as LoginChecked
  loginChecked.cookieUser = (JSON.parse(cookies().get("meat_web_user")?.value || "{}")) as CookieUser
  // 로그인 전용 페이지이고 쿠키 정보가 없을 경우
  if (loginOnly && (!loginChecked.cookieUser.third_party || !loginChecked.cookieUser.access_token)) {
    redirect("/")
  }
  // 쿠키 정보가 없을 경우
  if (!loginChecked.cookieUser.third_party || !loginChecked.cookieUser.access_token) {
    return loginChecked
  }
  // access_token으로 회원 정보 받기
  if (loginChecked.cookieUser.third_party === "Naver") {
    const responseUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/naver-login`, {
      method: "POST",
      body: JSON.stringify(loginChecked.cookieUser)
    })
    loginChecked.user = (await commonServices.responseJson(responseUser)).data
  } else if (loginChecked.cookieUser.third_party === "Kakao") {
    const responseUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/kakao-login`, {
      method: "POST",
      body: JSON.stringify(loginChecked.cookieUser)
    })
    loginChecked.user = (await commonServices.responseJson(responseUser)).data
  }
  // 로그인 전용 페이지이고 회원 정보를 못 받은 경우
  if (loginOnly && !loginChecked.user.user_pk) {
    redirect("/")
  }
  return loginChecked
}

export const adminCheck = async (isPage: boolean): Promise<LoginChecked> => {
  cookies() // cookies()를 호출해야 npm run build에서 오류가 발생하지 않는다.
  const loginChecked = await loginCheck(false)
  if (!loginChecked.user.is_admin) {
    if (isPage) {
      redirect("/admin")
    } else {
      throw {
        status: 500,
        message: "관리자만 접근 가능합니다.",
        redirectTo: "/home"
      }
    }
  }
  return loginChecked
}
