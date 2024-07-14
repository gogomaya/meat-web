import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {stat} from "fs"

export const GET = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {
  const {order_pk} = context.params
  console.log(`order_pk : ${order_pk}`)

  const mysql = await mysql2Pool()
  const [order]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT o.* 
    FROM orders o
    WHERE order_pk = ?
  `, [order_pk])

  if (order.length === 0) {
    console.log("주문 정보 조회 시 에러..")
    return NextResponse.error()
  }

  return NextResponse.json({
    message: "Payment created successfully",
    status: 200,
    order: order[0]
  })
}


export const PUT = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {
  const {order_pk} = context.params
  const formData = await request.formData()
  const {address_pk, shipment_pk, guest_name, guest_mobile, status} = Object.fromEntries(formData.entries())

  const mysql = await mysql2Pool()
  const [result]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    UPDATE orders
    SET 
        address_pk = ?
       ,shipment_pk = ?
       ,guest_name = ?
       ,guest_mobile = ?
       ,status = ?
    WHERE order_pk = ?
  `, [address_pk, shipment_pk, guest_name || "",  guest_mobile || "", status, order_pk])

  // console.log("result : " + result)

  return NextResponse.json({
    result: "Order updated successfully",
    status: 200
  })
}

export const DELETE = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {
  const {order_pk} = context.params

  const mysql = await mysql2Pool()
  // 주문 삭제
  const [result]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    DELETE FROM orders WHERE order_pk = ?
  `, [order_pk])

  // console.log("result : " + result)

  // 주문 항목 삭제
  const [item_result]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    DELETE FROM order_items WHERE order_pk = ?
    `, [order_pk])

  console.log("item_result : " + item_result)

  return NextResponse.json({
    result: "Order deleted successfully"
  })
}
