import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {FieldPacket, RowDataPacket} from "mysql2/promise"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/admin/page"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "review_reply_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""
  const review_pk = searchParams.get("review_pk") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
  select
    count(*) as total_rows
  from reviews_replies
  where
    ("" = ? or review_pk = ?)
    and ("" = ? or contents like concat("%", ?, "%"))
`, [review_pk, review_pk, query, query])
  const [reviews_replies]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      rr.*,
      (select ifnull(u.name, u.nickname) from users u where u.user_pk = rr.user_pk) as user_name
    from reviews_replies rr
    where
      ("" = ? or review_pk = ?)
      and ("" = ? or contents like concat("%", ?, "%"))
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
    `, [review_pk, review_pk, query, query, page, rowsPerPage])
  return NextResponse.json({
    reviews_replies,
    total_rows: total_rows[0].total_rows
  })
}

export const POST = async (request: NextRequest) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  const reviews_reply = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    reviews_reply[key] = value
  }

  const columns = [
    "review_pk",
    "review_reply_pk",
    "user_pk",
    "contents"
  ]
  await mysql.execute(`
    insert into reviews_replies (
      ${columns.join(", ")}
    ) values (
      ${columns.map(() => "?").join(", ")}
    )
  `, columns.map((column) => reviews_reply[column]))

  return NextResponse.json({
    result: "reviewsRepliesCreate"
  })
}
