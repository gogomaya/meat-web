import {NextRequest, NextResponse} from "next/server"
import {cookies} from "next/headers"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import mysql2Pool from "@/libraries/mysql2Pool"
import {ResponseApi} from "@/types/commonTypes"
import {naverServices} from "@/services/naverServices"
import {commonServices} from "@/services/commonServices"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code") || ""
  const state = searchParams.get("state") || ""
  try {
    // 네이버 토큰 발행
    const responseAccessToken: ResponseApi = await naverServices.accessToken(code, state)
    const access_token = responseAccessToken.data.access_token
    // access_token으로 회원 정보 받기
    const responseNaverUser: ResponseApi = await naverServices.getUser(access_token)
    if (responseNaverUser.data?.resultcode !== "00") {
      throw {
        status: 500,
        message: "naverServices.getUser Error"
      }
    }
    const naverUser = responseNaverUser.data.response
    // 회원 등록되었는지 확인
    const mysql = await mysql2Pool()
    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      select
        user_pk
      from users
      where
        id = ? and third_party = ?
    `, [naverUser.id, "Naver"])
    if (rows.length === 0) {
      // 회원 등록
      await mysql.execute(`
        insert into users (
          id, name, mobile, third_party
        ) values (
          ?, ?, ?, ?
        )
      `, [naverUser.id, naverUser.name, naverUser.mobile, "Naver"])
    }

    const cookieStore = cookies()
    cookieStore.set({
      name: "meat_web_user",
      value: JSON.stringify({
        third_party: "Naver",
        access_token
      }),
      httpOnly: true,
      maxAge: 60 * 60,
      domain: process.env.NEXT_PRIVATE_HOST
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
  const responseNaverUser: ResponseApi = await naverServices.getUser(cookieUser.access_token)
  if (responseNaverUser.data?.resultcode !== "00") {
    throw {
      status: 500,
      message: "naverServices.getUser Error"
    }
  }
  const naverUser = responseNaverUser.data.response
  // 회원 등록되었는지 확인
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      user_pk, name, mobile, is_admin
    from users
    where
      id = ? and third_party = ?
  `, [naverUser.id, "Naver"])
  return NextResponse.json({
    ...rows[0]
  })
}
