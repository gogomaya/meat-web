import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const DELETE = async (
  request: NextRequest,
  context: {params: {bookmark_pk: number}}
) => {
  const {bookmark_pk} = context.params

  const mysql = await mysql2Pool()
  const [result]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    DELETE FROM bookmarks WHERE bookmark_pk = ?
  `, [bookmark_pk])

  console.log("result : " + result)

  return NextResponse.json({
    result: "Bookmarks deleted successfully"
  })
}
