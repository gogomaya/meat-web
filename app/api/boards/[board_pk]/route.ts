import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import fs from "fs"
import {EmptyObject} from "@/types/commonTypes"
import {deleteNotUsedImages} from "@/app/api/boards/route"
import {loginCheck} from "@/app/users/login/loginCheck"

export const GET = async (
  _request: NextRequest,
  context: {params: {board_pk: number}}
) => {
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      b.*, (
        select nickname from users u
        where u.user_pk = b.user_pk
      ) as nickname
    from boards b
    where
      b.board_pk = ?
  `, [context.params.board_pk])
  if (rows.length === 0) {
    return NextResponse.json({
      message: "해당 글이 없습니다."
    }, {status: 500})
  }
  return NextResponse.json({
    board: {
      ...rows[0],
      is_main: !!rows[0].is_main,
      is_best: !!rows[0].is_best
    }
  })
}

export const DELETE = async (
  _request: NextRequest,
  context: {params: {board_pk: number}}
) => {
  const {user} = await loginCheck(true)
  const mysql = await mysql2Pool()
  const [auth_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      board_pk
    from boards
    where
      board_pk = ? and
      (user_pk = ? or ?)
  `, [context.params.board_pk, user.user_pk, user.is_admin])
  if (auth_rows.length === 0) {
    return NextResponse.json({
      message: "올바른 접근이 아닙니다."
    }, {status: 500})
  }
  await mysql.execute(`
    delete from boards
    where board_pk = ?
  `, [context.params.board_pk])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      uuid, file_name
    from boards_images
    where
      board_pk = ?
  `, [context.params.board_pk])
  for (const row of rows) {
    fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/boards/${row.file_name}`, {force: true})
  }
  await mysql.execute(`
    delete from boards_images
    where board_pk = ?
  `, [context.params.board_pk])
  return NextResponse.json({
    result: "boardsDelete"
  })
}

export const PATCH = async (
  request: NextRequest,
  context: {params: {board_pk: number}}
) => {
  const {user} = await loginCheck(true)
  const searchParams = request.nextUrl.searchParams
  const uuid = searchParams.get("uuid") || "uuid"
  const mysql = await mysql2Pool()
  const board = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    board[key] = value
  }

  const [auth_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      board_pk
    from boards
    where
      board_pk = ? and
      (user_pk = ? or ?)
  `, [context.params.board_pk, user.user_pk, user.is_admin])
  if (auth_rows.length === 0) {
    return NextResponse.json({
      message: "올바른 접근이 아닙니다."
    }, {status: 500})
  }
  const columns = [
    "category",
    "title",
    "contents"
  ]
  await mysql.execute(`
    update boards
    set
      ${columns.map((column) => `${column} = ?`).join(", ")}
    where
      board_pk = ?
  `, columns.map((column) => board[column]).concat(context.params.board_pk))

  await deleteNotUsedImages(context.params.board_pk, uuid, board.contents)

  return NextResponse.json({
    result: "boardsUpdate"
  })
}
