import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
    const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
    const orderColumn = searchParams.get("orderColumn") || "shipment_pk"
    const orderDirection = searchParams.get("orderDirection") || "desc"
    const query = searchParams.get("query") || ""
    const user_pk = searchParams.get("user_pk") || ""

    const mysql = await mysql2Pool()

    const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT COUNT(*) AS total_rows FROM shipments
      WHERE ("" = ? OR address_pk = ?)
    `, [user_pk, user_pk])

    const [shipmentList]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM shipments
      WHERE ("" = ? OR address_pk = ?)
      ORDER BY ${orderColumn} ${orderDirection}
      LIMIT ?, ?
    `, [user_pk, user_pk, page, rowsPerPage])

    return NextResponse.json({
      shipmentList: shipmentList,
      total_rows: total_rows[0].total_rows
    })
  } catch (error) {
    console.error("Error occurred while fetching shipments:", error)
    return NextResponse.error()
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const address_pk = formData.get("address_pk")
    const recipient = formData.get("recipient")
    const recipient_mobile = formData.get("recipient_mobile")
    const delivery_request = formData.get("delivery_request") || null
    const delivery_method = formData.get("delivery_method") || null
    const tracking_no = formData.get("tracking_no") || null
    const ship_company = formData.get("ship_company") || null
    const status = formData.get("status") || "pending"

    const mysql = await mysql2Pool()

    // Add a new shipment
    await mysql.execute(`
      INSERT INTO shipments (address_pk, recipient, recipient_mobile, delivery_request, delivery_method, tracking_no, ship_company, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [address_pk, recipient, recipient_mobile, delivery_request, delivery_method, tracking_no, ship_company, status])

    return NextResponse.json({
      message: "Shipment created successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while creating shipment:", error)
    return NextResponse.error()
  }
}