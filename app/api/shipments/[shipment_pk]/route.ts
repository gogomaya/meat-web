import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"


export const GET = async (
  request: NextRequest,
  context: { params: { shipment_pk: number } }
) => {
  const {shipment_pk} = context.params
  console.log(`/api/shipments - shipment_pk : ${shipment_pk}`)
  try {
    const mysql = await mysql2Pool()
    const [shipment]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM shipments WHERE shipment_pk = ?
    `, [shipment_pk])

    if (shipment.length === 0) {
      return NextResponse.error()
    }

    return NextResponse.json({
      shipment: shipment[0]
    })
  } catch (error) {
    console.error("Error occurred while fetching shipment:", error)
    return NextResponse.error()
  }
}


export const PUT = async (
  request: NextRequest,
  context: { params: { shipment_pk: number } }
) => {
  const {shipment_pk} = context.params

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

    console.log(`shipment_pk : ${shipment_pk}`)
    const mysql = await mysql2Pool()

    await mysql.execute(`
      UPDATE shipments
      SET address_pk = ?, recipient = ?, recipient_mobile = ?, delivery_request = ?, delivery_method = ?, tracking_no = ?, ship_company = ?, status = ?
      WHERE shipment_pk = ?
    `, [address_pk, recipient, recipient_mobile, delivery_request, delivery_method, tracking_no, ship_company, status, shipment_pk])

    return NextResponse.json({
      message: "Shipment updated successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while updating shipment:", error)
    return NextResponse.error()
  }
}


export const DELETE = async (
  request: NextRequest,
  context: { params: { shipment_pk: number } }
) => {
  const {shipment_pk} = context.params

  try {
    const mysql = await mysql2Pool()
    await mysql.execute(`
      DELETE FROM shipments WHERE shipment_pk = ?
    `, [shipment_pk])

    return NextResponse.json({
      message: "Shipment deleted successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while deleting shipment:", error)
    return NextResponse.error()
  }
}


