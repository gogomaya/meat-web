import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"

export const DELETE = async (
  _request: NextRequest,
  context: {params: {review_reply_pk: number}}
) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  await mysql.execute(`
    delete from reviews_replies
    where review_reply_pk = ?
  `, [context.params.review_reply_pk])
  return NextResponse.json({
    result: "reviewsRepliesDelete"
  })
}

export const PATCH = async (
  request: NextRequest,
  context: {params: {review_reply_pk: number}}
) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  const review = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    review[key] = value
  }

  const columns = [
    "contents"
  ]
  await mysql.execute(`
    update reviews_replies
    set
      ${columns.map((column) => `${column} = ?`).join(", ")}
    where
      review_reply_pk = ?
  `, columns.map((column) => review[column]).concat(context.params.review_reply_pk))

  return NextResponse.json({
    result: "productsRepliesUpdate"
  })
}
