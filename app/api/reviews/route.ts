import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {FieldPacket, ResultSetHeader, RowDataPacket} from "mysql2/promise"
import {fileUpload} from "@/app/api/ckeditor5/upload-images/route"
import {EmptyObject} from "@/types/commonTypes"
import {loginCheck} from "@/app/users/login/loginCheck"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "review_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""
  const product_pk = searchParams.get("product_pk") || ""
  const user_pk = searchParams.get("user_pk") || ""

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
  select
    count(*) as total_rows
  from reviews
  where
    ("" = ? or product_pk = ?)
    and ("" = ? or user_pk = ?)
    and ("" = ? or contents like concat("%", ?, "%"))
`, [product_pk, product_pk, user_pk, user_pk, query, query])
  const [reviews]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      r.*,
      (select ifnull(u.name, u.nickname) from users u where u.user_pk = r.user_pk) as user_name,
      (select name from products p where p.product_pk = r.product_pk) as product_name
    from reviews r
    where
      ("" = ? or r.product_pk = ?)
      and ("" = ? or r.user_pk = ?)
      and ("" = ? or r.contents like concat("%", ?, "%"))
    order by ${orderColumn} ${orderDirection}
    limit ?, ?
  `, [product_pk, product_pk, user_pk, user_pk, query, query, page, rowsPerPage])
  for (const review of reviews) {
    // reviews_images
    const [reviews_images]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      select
        review_image_pk, file_name
      from reviews_images
      where
        review_pk = ?
      order by review_image_pk asc
    `, [review.review_pk])
    review.reviews_images = reviews_images
    // reviews_replies
    const [reviews_replies]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      select
        rr.*,
        (select ifnull(u.name, u.nickname) from users u where u.user_pk = rr.user_pk) as user_name
      from reviews_replies rr
      where
        review_pk = ?
      order by review_reply_pk desc
    `, [review.review_pk])
    review.reviews_replies = reviews_replies
    // reviews_likes
    const [reviews_likes]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      select
        user_pk, is_like
      from reviews_likes
      where
      review_pk = ?
    `, [review.review_pk])
    review.reviews_likes = reviews_likes
  }
  return NextResponse.json({
    reviews,
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
