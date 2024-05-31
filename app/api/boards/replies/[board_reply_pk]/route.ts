import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"

export const DELETE = async (
  _request: NextRequest,
  context: {params: {board_reply_pk: number}}
) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  await mysql.execute(`
    delete from boards_replies
    where board_reply_pk = ?
  `, [context.params.board_reply_pk])
  return NextResponse.json({
    result: "boardsRepliesDelete"
  })
}

export const PATCH = async (
  request: NextRequest,
  context: {params: {board_reply_pk: number}}
) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  const board = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    board[key] = value
  }

  const columns = [
    "contents"
  ]
  await mysql.execute(`
    update boards_replies
    set
      ${columns.map((column) => `${column} = ?`).join(", ")}
    where
      board_reply_pk = ?
  `, columns.map((column) => board[column]).concat(context.params.board_reply_pk))

  return NextResponse.json({
    result: "boardsRepliesUpdate"
  })
}
