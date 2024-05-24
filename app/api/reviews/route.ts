import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {FieldPacket, ResultSetHeader, RowDataPacket} from "mysql2/promise"
import {fileUpload} from "@/app/api/ckeditor5/upload-images/route"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/admin/page"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "review_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""
  const product_pk = searchParams.get("product_pk") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
  select
    count(*) as total_rows
  from reviews
  where
    ("" = ? or product_pk = ?)
    and ("" = ? or contents like concat("%", ?, "%"))
`, [product_pk, product_pk, query, query])
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      r.*,
      ifnull(u.name, u.nickname) as user_name,
      p.name as product_name,
      if(isnull(ri.review_pk), '[]', json_arrayagg(
        json_object(
          'review_image_pk', ri.review_image_pk, 'file_name', ri.file_name
        )
      )) as review_images
    from reviews r
    inner join users u
    on
      r.user_pk = u.user_pk
    inner join products p
    on
      r.product_pk = p.product_pk
    left outer join reviews_images ri
    on
      r.review_pk = ri.review_pk
    where
      ("" = ? or r.product_pk = ?)
      and ("" = ? or r.contents like concat("%", ?, "%"))
    group by r.review_pk
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
  `, [product_pk, product_pk, query, query, page, rowsPerPage])
  return NextResponse.json({
    reviews: rows.map((row) => {
      row.review_images = JSON.parse(row.review_images)
      row.review_images.forEach((image_file_name: string, index: number) => {
        row.review_images[index] = JSON.parse(image_file_name)
      })
      return row
    }),
    total_rows: total_rows[0].total_rows
  })
}

export const POST = async (request: NextRequest) => {
  await loginCheck(true)
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
    "product_pk",
    "user_pk",
    "grade",
    "contents"
  ]
  const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(`
    insert into reviews (
      ${columns.join(", ")}
    ) values (
      ${columns.map(() => "?").join(", ")}
    )
  `, columns.map((column) => review[column]))
  fileNames.forEach(async (fileName) => {
    await mysql.execute(`
      insert into reviews_images (
        review_pk, file_name
      ) values (
        ?, ?
      )
    `, [result.insertId, fileName])
  })

  return NextResponse.json({
    result: "reviewsCreate"
  })
}
