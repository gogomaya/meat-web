import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {FieldPacket, RowDataPacket} from "mysql2/promise"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 1000
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "board_reply_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""
  const board_pk = searchParams.get("board_pk") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
  select
    count(*) as total_rows
  from boards_replies
  where
    ("" = ? or board_pk = ?)
    and ("" = ? or contents like concat("%", ?, "%"))
`, [board_pk, board_pk, query, query])
  const [boards_replies]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      rr.*,
      (select ifnull(u.name, u.nickname) from users u where u.user_pk = rr.user_pk) as user_name
    from boards_replies rr
    where
      ("" = ? or board_pk = ?)
      and ("" = ? or contents like concat("%", ?, "%"))
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
    `, [board_pk, board_pk, query, query, page, rowsPerPage])
  return NextResponse.json({
    boards_replies,
    total_rows: total_rows[0].total_rows
  })
}

export const POST = async (request: NextRequest) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  const boards_reply = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    boards_reply[key] = value
  }

  const columns = [
    "board_pk",
    "board_reply_pk",
    "user_pk",
    "contents"
  ]
  await mysql.execute(`
    insert into boards_replies (
      ${columns.join(", ")}
    ) values (
      ${columns.map(() => "?").join(", ")}
    )
  `, columns.map((column) => boards_reply[column]))

  return NextResponse.json({
    result: "boardsRepliesCreate"
  })
}
