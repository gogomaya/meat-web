import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket, ResultSetHeader} from "mysql2/promise"
import fs from "fs"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "board_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""
  const category = searchParams.get("category") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
  select
    count(*) as total_rows
  from boards
  where
    category = ? and
    ("" = ? or title like concat("%", ?, "%"))
`, [category, query, query])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      b.board_pk, b.category, b.user_pk, b.product_pk, b.title, b.created_at,
      (select ifnull(u.name, u.nickname) from users u where u.user_pk = b.user_pk) as user_name,
      (select name from products p where p.product_pk = b.product_pk) as product_name,
      (select count(*) from boards_replies br where br.board_pk = b.board_pk) as replies_count
    from boards b
    where
      b.category = ? and
      ("" = ? or b.title like concat("%", ?, "%"))
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
  `, [category, query, query, page, rowsPerPage])
  return NextResponse.json({
    boards: rows,
    total_rows: total_rows[0].total_rows
  })
}