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
    const status = formData.get("status") || "pending"

    const mysql = await mysql2Pool()

    // Add a new shipment
    await mysql.execute(`
      INSERT INTO shipments (address_pk, status)
      VALUES (?, ?)
    `, [address_pk, status])

    // 마지막으로 삽입된 레코드의 AUTO_INCREMENT 값 가져오기
    const [pk]: [RowDataPacket[], FieldPacket[]] = await mysql.execute("SELECT LAST_INSERT_ID() shipment_pk FROM dual")
    const shipment_pk = pk[0]["shipment_pk"]
    console.log(`등록된 배송번호 - shipment_pk : ${shipment_pk}`)

    return NextResponse.json({
      message: "Shipment created successfully",
      status: 200,
      shipment_pk: shipment_pk
    })
  } catch (error) {
    console.error("Error occurred while creating shipment:", error)
    return NextResponse.error()
  }
}