import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {adminCheck} from "@/app/users/login/loginCheck"

export const GET = async (request: NextRequest) => {
  await adminCheck(false)
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "user_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      count(*) as total_rows
    from users
    where
      "" = ? or name like concat("%", ?, "%") or nickname like concat("%", ?, "%")
  `, [query, query, query])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      user_pk, id, ifnull(name, nickname) as name, third_party, created_at
    from users
    where
      "" = ? or name like concat("%", ?, "%") or nickname like concat("%", ?, "%")
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
  `, [query, query, query, page, rowsPerPage])
  return NextResponse.json({
    users: rows,
    total_rows: total_rows[0].total_rows
  })
}
