import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
  const orderColumn = searchParams.get("orderColumn") || "order_pk"
  const orderDirection = searchParams.get("orderDirection") || "desc"
  const query = searchParams.get("query") || ""
  const user_pk = searchParams.get("user_pk") || ""

  console.log(":::::::::::::::: [GET] :::::::::::::::")
  console.log("::::::::::: /api/orders ::::::::::")
  console.log("searchParams : " + searchParams)

  const mysql = await mysql2Pool()
  const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT COUNT(*) AS total_rows FROM orders
    WHERE user_pk IS NOT NULL
    AND ("" = ? OR user_pk = ?)
  `, [user_pk, user_pk])

  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT * FROM orders
    WHERE user_pk IS NOT NULL
    AND ("" = ? OR user_pk = ?)
    ORDER BY ${orderColumn} ${orderDirection}
    LIMIT ?, ?
  `, [user_pk, user_pk, page, rowsPerPage])
  console.log(rows)
  return NextResponse.json({
    orders: rows,
    total_rows: total_rows[0].total_rows
  })
}

export const POST = async (request: NextRequest) => {
  const formData = await request.formData()
  const user_pk = formData.get("user_pk")
  const shipment_pk = formData.get("shipment_pk")
  const title = formData.get("title")
  const guest_mobile = formData.get("guest_mobile")
  const total_price = formData.get("total_price")
  const total_quantity = formData.get("total_quantity")
  const total_count = formData.get("total_count")

  const mysql = await mysql2Pool()
  const columns = ["user_pk", "shipment_pk", "title", "guest_mobile", "total_price", "total_quantity", "total_count"]
  const values = [user_pk, shipment_pk, title, guest_mobile, total_price, total_quantity, total_count]

  const [result] = await mysql.execute(`
    INSERT INTO orders (${columns.join(", ")})
    VALUES (${columns.map(() => "?").join(", ")})
  `, values)

  return NextResponse.json({
    result: "Order created successfully"
  })
}
