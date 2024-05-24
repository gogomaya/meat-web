import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import fs from "fs"
import {loginCheck} from "@/app/admin/page"

export const DELETE = async (
  _request: NextRequest,
  context: {params: {review_image_pk: number}}
) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      file_name
    from reviews_images
    where
      review_image_pk = ?
  `, [context.params.review_image_pk])
  for (const row of rows) {
    fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/reviews/${row.file_name}`, {force: true})
  }
  await mysql.execute(`
    delete from reviews_images
    where review_image_pk = ?
  `, [context.params.review_image_pk])
  return NextResponse.json({
    result: "reviewsImagesDelete"
  })
}
