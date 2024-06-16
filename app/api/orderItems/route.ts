import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {OrderItemSearchParams} from "@/types/orderItemsTypes"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 1000
    const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
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

    // const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    //   SELECT *
    //   FROM order_items item JOIN products p ON item.product_pk = p.product_pk
    //   WHERE ("" = ? OR order_pk = ?)
    //   ORDER BY ${orderColumn} ${orderDirection}
    //   LIMIT ?, ?
    // `, [order_pk, order_pk, page, rowsPerPage])
    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT 
          oi.order_item_pk,
          oi.order_pk,
          oi.product_pk,
          oi.quantity,
          oi.price,
          oi.created_at AS order_item_created_at,
          p.*, 
          pi.file_name AS image_file_name
      FROM 
          order_items oi
          LEFT OUTER JOIN 
              products p ON oi.product_pk = p.product_pk
          LEFT OUTER JOIN 
              products_images pi ON p.product_pk = pi.product_pk AND ISNULL(pi.uuid)
      WHERE  ("" = ? OR order_pk = ?)
      ORDER BY ${orderColumn} ${orderDirection}
    `, [order_pk, order_pk])

    console.log(`orderItems : ${rows}`)
    console.log(`total_rows : ${total_rows}`)

    return NextResponse.json({
      message: "[API] /api/orderItems - 주문 항목 리스트 조회 성공",
      status: 200,
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
    const discount_price = formData.get("discount_price")

    const mysql = await mysql2Pool()
    const columns = ["order_pk", "product_pk", "quantity", "price", "discount_price"]
    const values = [order_pk, product_pk, quantity, price, discount_price]

    const [result] = await mysql.execute(`
      INSERT INTO order_items (${columns.join(", ")})
      VALUES (${columns.map(() => "?").join(", ")})
    `, values)

    return NextResponse.json({
      message: "주문 항목 등록 성공",
      status: 200,
      result: "Order item created successfully"
    })
  } catch (error) {
    console.error("Error occurred while creating order item:", error)
    return NextResponse.error()
  }
}
