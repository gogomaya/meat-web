import {NextRequest, NextResponse} from "next/server"
import {cookies} from "next/headers"

export const GET = async () => {
  const cookieStore = cookies()
  cookieStore.set({
    name: "meat_web_user",
    value: "",
    httpOnly: true,
    maxAge: 60 * 60,
    domain: process.env.NEXT_PRIVATE_HOST
  })
  return NextResponse.json({
    result: "logout"
  })
}
