import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import fs from "fs"
import {fileUpload} from "@/app/api/ckeditor5/upload-images/route"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/admin/page"

export const DELETE = async (
  _request: NextRequest,
  context: {params: {review_pk: number}}
) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  await mysql.execute(`
    delete from reviews
    where review_pk = ?
  `, [context.params.review_pk])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      file_name
    from reviews_images
    where
      review_pk = ?
  `, [context.params.review_pk])
  for (const row of rows) {
    fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/reviews/${row.file_name}`, {force: true})
  }
  await mysql.execute(`
    delete from reviews_images
    where review_pk = ?
  `, [context.params.review_pk])
  return NextResponse.json({
    result: "reviewsDelete"
  })
}

export const PATCH = async (
  request: NextRequest,
  context: {params: {review_pk: number}}
) => {
  await loginCheck(true)
  const searchParams = request.nextUrl.searchParams
  const mysql = await mysql2Pool()
  const review = {} as EmptyObject
  const formData = await request.formData()
  const fileNames = []
  for (const [key, value] of formData.entries()) {
    if (key === "images[]") {
      fileNames.push(await fileUpload(value as File, "reviews"))
    } else {
      review[key] = value
    }
  }

  const columns = [
    "grade",
    "contents"
  ]
  await mysql.execute(`
    update  reviews
    set
      ${columns.map((column) => `${column} = ?`).join(", ")}
    where
      review_pk = ?
  `, columns.map((column) => review[column]).concat(context.params.review_pk))
  fileNames.forEach(async (fileName) => {
    await mysql.execute(`
      insert into reviews_images (
        review_pk, file_name
      ) values (
        ?, ?
      )
    `, [context.params.review_pk, fileName])
  })

  return NextResponse.json({
    result: "productsUpdate"
  })
}
