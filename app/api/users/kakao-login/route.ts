import {NextRequest, NextResponse} from "next/server"
import {cookies} from "next/headers"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import mysql2Pool from "@/libraries/mysql2Pool"
import {ResponseApi} from "@/types/commonTypes"
import {kakaoServices} from "@/services/kakaoServices"
import {commonServices} from "@/services/commonServices"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code") || ""
  const state = searchParams.get("state") || ""
  try {
    // 카카오 토큰 발행
    const responseAccessToken: ResponseApi = await kakaoServices.accessToken(code, state)
    const access_token = responseAccessToken.data.access_token
    // access_token으로 회원 정보 받기
    const responseKakaoUser: ResponseApi = await kakaoServices.getUser(access_token)
    if (!responseKakaoUser.data?.id) {
      throw {
        status: 500,
        message: "kakaoServices.getUser Error"
      }
    }
    const kakaoUser = responseKakaoUser.data
    // 회원 등록되었는지 확인
    const mysql = await mysql2Pool()
    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      select
        user_pk
      from users
      where
        id = ? and third_party = ?
    `, [kakaoUser.id, "Kakao"])
    if (rows.length === 0) {
      // 회원 등록
      await mysql.execute(`
        insert into users (
          id, nickname, third_party
        ) values (
          ?, ?, ?
        )
      `, [kakaoUser.id, kakaoUser.properties.nickname, "Kakao"])
    }

    const cookieStore = cookies()
    cookieStore.set({
      name: "meat_web_user",
      value: JSON.stringify({
        third_party: "Kakao",
        access_token
      }),
      httpOnly: true,
      maxAge: 60 * 60,
      domain: process.env.NEXT_PUBLIC_HOST
    })
    return commonServices.responseOpener({
      openerReload: true,
      windowClose: true
    })
  } catch (error) {
    throw error
  }
}

export const POST = async (request: NextRequest) => {
  const cookieUser = await request.json()
  // access_token으로 회원 정보 받기
  const responseKakaoUser: ResponseApi = await kakaoServices.getUser(cookieUser.access_token)
  if (!responseKakaoUser.data?.id) {
    throw {
      status: 500,
      message: "kakaoServices.getUser Error"
    }
  }
  const kakaoUser = responseKakaoUser.data
  // 회원 등록되었는지 확인
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      user_pk, name as nickname, is_admin
    from users
    where
      id = ? and third_party = ?
  `, [kakaoUser.id, "Kakao"])
  return NextResponse.json({
    ...rows[0]
  })
}
