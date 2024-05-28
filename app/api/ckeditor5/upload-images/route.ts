import {loginCheck} from "@/app/users/login/loginCheck"
import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import fs from "fs"
import moment from "moment"

export type Table = "products" | "boards" | "reviews"

export const fileUpload = async (file: File, table: Table) => {
  const path = `../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/${table}`
  let fileName = file.name
  // 디렉토리 생성
  fs.mkdirSync(path, {recursive: true})
  // 파일이 존재하면 파일명에 시간 추가
  if (fs.existsSync(`${path}/${fileName}`)) {
    const splitDots = fileName.split(".")
    const extraFileName = `-${moment().format("YYMMDDHHmmss")}`
    if (splitDots.length > 1) {
      splitDots[splitDots.length - 2] += extraFileName
    } else {
      splitDots[0] += extraFileName
    }
    fileName = splitDots.join(".")
  }
  // 파일 생성
  fs.writeFileSync(`${path}/${fileName}`, Buffer.from(await file.arrayBuffer()))
  return fileName
}

export const POST = async (request: NextRequest) => {
  await loginCheck(true)
  const searchParams = request.nextUrl.searchParams
  const table: Table = searchParams.get("table") === "products" ? "products" : "boards"
  const column = table.substring(0, table.length - 1)
  const uuid = searchParams.get("uuid") || "uuid"
  const formData = await request.formData()
  const fileName = await fileUpload(formData.get("upload") as File, table)
  const mysql = await mysql2Pool()
  await mysql.execute(`
    insert into ${table}_images (
      uuid, file_name
    ) values (
      ?, ?
    )
  `, [uuid, fileName])

  // 하루 지난 사용되지 않는 이미지 삭제
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      ${column}_image_pk, file_name
    from ${table}_images
    where
      ${column}_pk = 0 and
      created_at < date_add(now(), interval -1 day)
  `)
  for (const row of rows) {
    fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/${table}/${row.file_name}`, {force: true})
    await mysql.execute(`
      delete from ${table}_images
      where ${column}_image_pk = ?
    `, [row.product_image_pk])
  }

  return NextResponse.json({
    fileName: fileName,
    uploaded: 1,
    url: `/${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/${table}/${encodeURIComponent(fileName)}`
  })
}
