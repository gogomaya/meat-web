import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (
  request: NextRequest,
  context: {params: {user_pk: number, product_pk: number}}
) => {
  const searchParams = request.nextUrl.searchParams
  const {user_pk} = context.params
  const product_pk = searchParams.get("product_pk")

  console.log(`user_pk : ${user_pk}`)
  console.log(`product_pk : ${product_pk}`)


  const mysql = await mysql2Pool()
  const [bookmark]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT * FROM bookmarks WHERE user_pk = ? and product_pk = ?
  `, [user_pk, product_pk])

  console.log("bookmark : " + bookmark)

  return NextResponse.json({
    bookmark: bookmark[0]
  })

}
