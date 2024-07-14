import mysql2Pool from "@/libraries/mysql2Pool"
import {FieldPacket, RowDataPacket} from "mysql2/promise"
import {NextRequest, NextResponse} from "next/server"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
    const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
    const orderColumn = searchParams.get("orderColumn") || "address_pk"
    const orderDirection = searchParams.get("orderDirection") || "desc"
    const query = searchParams.get("query") || ""

    const mysql = await mysql2Pool()

    const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT COUNT(*) AS total_rows
      FROM cancellations
    `, [])

    const [cancellations]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT c.* 
            ,o.*
            ,o.created_at as ordered_at
            ,c.status as status
            ,o.status as order_status
      FROM cancellations c JOIN orders o ON (c.order_pk = o.order_pk)
      ORDER BY o.${orderColumn} ${orderDirection}
      LIMIT ?, ?
    `, [page, rowsPerPage])


    return NextResponse.json({
      cancellations: cancellations,
      total_rows: total_rows[0].total_rows
    })

  } catch (error) {
    console.error("Error occurred while fetching cancellations:", error)
    return NextResponse.error()
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const order_pk = Number(formData.get("order_pk"))
    const type = formData.get("type")
    const status = formData.get("status")
    const description = formData.get("description") || ""
    const is_confirmed = formData.get("is_confirmed") == "true"
    const is_refund = formData.get("is_refund") == "true"
    const account_number = formData.get("account_number") || ""
    const bank_name = formData.get("bank_name") || ""
    const depositor = formData.get("depositor") || ""

    const mysql = await mysql2Pool()

    await mysql.execute(`
        INSERT INTO cancellations (order_pk, type, status, description, is_confirmed, is_refund, account_number, bank_name, depositor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
      order_pk,
      type,
      status,
      description,
      is_confirmed,
      is_refund,
      account_number,
      bank_name,
      depositor
    ])

    // 마지막으로 삽입된 cancellation_pk 가져오기
    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
        SELECT LAST_INSERT_ID() as cancellation_pk
      `)

    const cancellation_pk = rows[0].cancellation_pk

    return NextResponse.json({
      message: "Cancellation created successfully",
      status: 200,
      cancellation_pk: cancellation_pk
    })

  } catch (error) {
    console.error("Error occurred while creating cancellation:", error)
    return NextResponse.error()
  }
}

