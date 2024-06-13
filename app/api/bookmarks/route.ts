import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
    const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
    const orderColumn = searchParams.get("orderColumn") || "bookmark_pk"
    const orderDirection = searchParams.get("orderDirection") || "desc"
    const query = searchParams.get("query") || ""
    const user_pk = searchParams.get("user_pk") || ""

    // console.log(":::::::::::::::: [GET] :::::::::::::::")
    // console.log("::::::::::: /api/bookmarks ::::::::::")

    const mysql = await mysql2Pool()

    const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT COUNT(*) AS total_rows FROM bookmarks
      WHERE user_pk IS NOT NULL
      AND ("" = ? OR user_pk = ?)
    `, [user_pk, user_pk])

    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT b.bookmark_pk, p.product_pk, p.name, p.description, p.category, p.price, pi.file_name AS image_file
      FROM bookmarks b
      JOIN products p ON b.product_pk = p.product_pk
      LEFT JOIN products_images pi ON p.product_pk = pi.product_pk
      WHERE b.user_pk IS NOT NULL
      AND ("" = ? OR b.user_pk = ?)
      ORDER BY ${orderColumn} ${orderDirection}
      LIMIT ?, ?
    `, [user_pk, user_pk, page, rowsPerPage])

    console.log(rows)

    return NextResponse.json({
      bookmarks: rows,
      total_rows: total_rows[0].total_rows
    })
  } catch (error) {
    console.error("Error occurred while fetching bookmarks:", error)
    return NextResponse.error()
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const user_pk = formData.get("user_pk")
    const product_pk = formData.get("product_pk")

    const mysql = await mysql2Pool()

    const [existingBookmarks]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM bookmarks
      WHERE user_pk = ? AND product_pk = ?
    `, [user_pk, product_pk])

    if (existingBookmarks.length > 0) {
      // 이미 해당 제품이 북마크에 있는 경우 삭제
      await mysql.execute(`
        DELETE FROM bookmarks
        WHERE user_pk = ? AND product_pk = ?
      `, [user_pk, product_pk])

      return NextResponse.json({
        message: "delete",
        status: 200
      })
    } else {
      // 새로운 북마크 추가
      await mysql.execute(`
        INSERT INTO bookmarks (product_pk, user_pk)
        VALUES (?, ?)
      `, [product_pk, user_pk])

      return NextResponse.json({
        message: "insert",
        status: 200
      })
    }
  } catch (error) {
    console.error("Error occurred while creating/deleting bookmark:", error)
    return NextResponse.error()
  }
}
