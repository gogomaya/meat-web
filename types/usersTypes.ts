export type ThirdParty = "Naver" | "Kakao"

export interface CookieUser {
  third_party: ThirdParty
  access_token: string
}

export interface User {
  user_pk: number
  id: string
  name: string
  nickname: string
  mobile: string
  third_party: ThirdParty
  is_admin?: boolean
  created_at?: string
}

export interface LoginChecked {
  user: User
  cookieUser: CookieUser
}
