import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import fs from "fs"
import {fileUpload} from "@/app/api/ckeditor5/upload-images/route"
import {EmptyObject} from "@/types/commonTypes"
import {deleteNotUsedImages} from "@/app/api/products/route"
import {adminCheck} from "@/app/admin/page"

export const GET = async (
  _request: NextRequest,
  context: {params: {product_pk: number}}
) => {
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      p.*, pi.file_name as image_file_name
    from products p
    left outer join products_images pi
    on
      p.product_pk = pi.product_pk and isnull(pi.uuid)
    where
      p.product_pk = ?
  `, [context.params.product_pk])
  if (rows.length === 0) {
    return NextResponse.json({
      message: "해당 상품이 없습니다."
    }, {status: 500})
  }
  return NextResponse.json({
    product: {
      ...rows[0],
      is_today: !!rows[0].is_today,
      is_best: !!rows[0].is_best,
      is_sold_out: !!rows[0].is_sold_out
    }
  })
}

export const DELETE = async (
  _request: NextRequest,
  context: {params: {product_pk: number}}
) => {
  await adminCheck()
  const mysql = await mysql2Pool()
  await mysql.execute(`
    delete from products
    where product_pk = ?
  `, [context.params.product_pk])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      uuid, file_name
    from products_images
    where
      product_pk = ?
  `, [context.params.product_pk])
  for (const row of rows) {
    fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${row.file_name}`, {force: true})
  }
  await mysql.execute(`
    delete from products_images
    where product_pk = ?
  `, [context.params.product_pk])
  return NextResponse.json({
    result: "productsDelete"
  })
}

export const PATCH = async (
  request: NextRequest,
  context: {params: {product_pk: number}}
) => {
  await adminCheck()
  const searchParams = request.nextUrl.searchParams
  const uuid = searchParams.get("uuid") || "uuid"
  const mysql = await mysql2Pool()
  const product = {} as EmptyObject
  const formData = await request.formData()
  for (const [key, value] of formData.entries()) {
    if (key === "image" && value) {
      const fileName = await fileUpload(value as File, "products")
      const image_file_name = formData.get("image_file_name")
      if (image_file_name) {
        await mysql.execute(`
          delete from products_images
          where product_pk = ? and isnull(uuid)
        `, [context.params.product_pk])
        fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${image_file_name}`, {force: true})
      }
      await mysql.execute(`
        insert into products_images (
          product_pk, file_name
        ) values (
          ?, ?
        )
      `, [context.params.product_pk, fileName])
    } else if (key === "is_today" || key === "is_best" || key === "is_sold_out") {
      product[key] = JSON.parse(String(value))
    } else {
      product[key] = value
    }
  }

  const columns = [
    "name",
    "category",
    "category_menu",
    "price",
    "description",
    "origin",
    "weight",
    "type",
    "part",
    "per100g",
    "grade",
    "package",
    "is_today",
    "is_best",
    "is_sold_out",
    "contents"
  ]
  await mysql.execute(`
    update products
    set
      ${columns.map((column) => `${column} = ?`).join(", ")}
    where
      product_pk = ?
  `, columns.map((column) => product[column]).concat(context.params.product_pk))

  await deleteNotUsedImages(context.params.product_pk, uuid, product.contents)

  return NextResponse.json({
    result: "productsUpdate"
  })
}
