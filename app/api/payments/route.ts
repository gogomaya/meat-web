import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
    const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
    const orderColumn = searchParams.get("orderColumn") || "payment_pk"
    const orderDirection = searchParams.get("orderDirection") || "desc"
    const query = searchParams.get("query") || ""
    const order_pk = searchParams.get("order_pk") || ""

    const mysql = await mysql2Pool()

    const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT COUNT(*) AS total_rows FROM payments
      WHERE ("" = ? OR order_pk = ?)
    `, [order_pk, order_pk])

    const [paymentList]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM payments
      WHERE ("" = ? OR order_pk = ?)
      ORDER BY ${orderColumn} ${orderDirection}
      LIMIT ?, ?
    `, [order_pk, order_pk, page, rowsPerPage])

    return NextResponse.json({
      paymentList: paymentList,
      total_rows: total_rows[0].total_rows
    })
  } catch (error) {
    console.error("Error occurred while fetching payments:", error)
    return NextResponse.error()
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const order_pk = formData.get("order_pk")
    const payment_method = formData.get("payment_method") || null
    const status = formData.get("status")
    const payment_key = formData.get("payment_key")

    const mysql = await mysql2Pool()

    // Add a new payment
    await mysql.execute(`
      INSERT INTO payments (order_pk, payment_method, status, payment_key)
      VALUES (?, ?, ?, ?)
    `, [order_pk, payment_method, status, payment_key])

    // 마지막으로 삽입된 레코드의 AUTO_INCREMENT 값 가져오기
    const [pk]: [RowDataPacket[], FieldPacket[]] = await mysql.execute("SELECT LAST_INSERT_ID() payment_pk FROM dual")
    const payment_pk = pk[0]["payment_pk"]
    // console.log(`등록된 결제번호 - payment_pk : ${payment_pk}`)

    return NextResponse.json({
      message: "Payment created successfully",
      status: 200,
      payment_pk: payment_pk
    })
  } catch (error) {
    console.error("Error occurred while creating payment:", error)
    return NextResponse.error()
  }
}