import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {OrderItemSearchParams} from "@/types/orderItemsTypes"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    let rowsPerPage = Number(searchParams.get("rowsPerPage")) || 1000         // 주문항목은 페이징 할 이유가 거의 없을 듯
    const page = (Number(searchParams.get("page")) - 1) * rowsPerPage || 0
    const orderColumn = searchParams.get("orderColumn") || "order_item_pk"
    const orderDirection = searchParams.get("orderDirection") || "desc"
    const query = searchParams.get("query") || ""
    const order_pk = searchParams.get("order_pk") || ""
    console.log("::::::::::: searchParams ::::::::::")
    console.log(searchParams)
    console.log("order_pk : " + order_pk)
    const mysql = await mysql2Pool()
    const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT COUNT(*) AS total_rows FROM order_items
      WHERE ("" = ? OR order_pk = ?)
    `, [order_pk, order_pk])

    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * 
      FROM order_items item JOIN products p ON item.product_pk = p.product_pk
      WHERE ("" = ? OR order_pk = ?)
      ORDER BY ${orderColumn} ${orderDirection}
      LIMIT ?, ?
    `, [order_pk, order_pk, page, rowsPerPage])
    return NextResponse.json({
      orderItems: rows,
      total_rows: total_rows[0].total_rows
    })
  } catch (error) {
    console.error("Error occurred while fetching order items:", error)
    return NextResponse.error()
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const order_pk = formData.get("order_pk")
    const product_pk = formData.get("product_pk")
    const quantity = formData.get("quantity")
    const price = formData.get("price")

    const mysql = await mysql2Pool()
    const columns = ["order_pk", "product_pk", "quantity", "price"]
    const values = [order_pk, product_pk, quantity, price]

    const [result] = await mysql.execute(`
      INSERT INTO order_items (${columns.join(", ")})
      VALUES (${columns.map(() => "?").join(", ")})
    `, values)

    return NextResponse.json({
      result: "Order item created successfully"
    })
  } catch (error) {
    console.error("Error occurred while creating order item:", error)
    return NextResponse.error()
  }
}