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
  const product_pk = searchParams.get("product_pk") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
  select
    count(*) as total_rows
  from boards
  where
    category = ? and
    ("" = ? or product_pk = ?) and
    ("" = ? or title like concat("%", ?, "%"))
`, [category, product_pk, product_pk, query, query])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      b.board_pk, b.category, b.user_pk, b.product_pk, b.title, b.created_at,
      (select ifnull(u.name, u.nickname) from users u where u.user_pk = b.user_pk) as user_name,
      (select name from products p where p.product_pk = b.product_pk) as product_name,
      (select count(*) from boards_replies br where br.board_pk = b.board_pk) as replies_count
    from boards b
    where
      b.category = ? and
      ("" = ? or product_pk = ?) and
      ("" = ? or b.title like concat("%", ?, "%"))
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
  `, [category, product_pk, product_pk, query, query, page, rowsPerPage])
  return NextResponse.json({
    boards: rows,
    total_rows: total_rows[0].total_rows
  })
}

export const POST = async (request: NextRequest) => {
  const {user} = await loginCheck(true)
  const searchParams = request.nextUrl.searchParams
  const uuid = searchParams.get("uuid") || "uuid"
  const mysql = await mysql2Pool()
  const board = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    if (key === "product_pk" && !Number(value)) {
      board[key] = null
      continue
    }
    board[key] = value
  }
  board.user_pk = user.user_pk

  const columns = [
    "category",
    "user_pk",
    "product_pk",
    "title",
    "contents"
  ]
  const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(`
    insert into boards (
      ${columns.join(", ")}
    ) values (
      ${columns.map(() => "?").join(", ")}
    )
  `, columns.map((column) => board[column]))

  await deleteNotUsedImages(result.insertId, uuid, board.contents)

  return NextResponse.json({
    result: "boardsCreate"
  })
}

export const deleteNotUsedImages = async (
  board_pk: number, uuid: string, contents: string
) => {
  const mysql = await mysql2Pool()
  // uuid로 등록된 contents 안에 이미지들에게 board_pk 넣기
  await mysql.execute(`
    update boards_images
    set board_pk = ?
    where uuid = ?
  `, [board_pk, uuid])

  // uuid로 등록된 이미지가 contents 안에 없으면 삭제
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      board_image_pk, file_name
    from boards_images
    where
      board_pk = ? and not isnull(uuid)
  `, [board_pk])
  for (const row of rows) {
    if (!contents.includes(encodeURIComponent(row.file_name))) {
      await mysql.execute(`
        delete from boards_images
        where board_image_pk = ?
      `, [row.board_image_pk])
      fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/boards/${row.file_name}`, {force: true})
    }
  }
}
