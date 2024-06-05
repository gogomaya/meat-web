import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {
  const {order_pk} = context.params

  const mysql = await mysql2Pool()
  const [order]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT o.* 
          ,0 shipfee
          ,0 discount 
    FROM orders o
    WHERE order_pk = ?
  `, [order_pk])

  if (order.length === 0) {
    return NextResponse.error()
  }

  return NextResponse.json({
    order: order[0]
  })
}


export const PUT = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {
  const {order_pk} = context.params
  const formData = await request.formData()
  const {status} = Object.fromEntries(formData.entries())

  const mysql = await mysql2Pool()
  const [result]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    UPDATE orders
    SET status = ?
    WHERE order_pk = ?
  `, [status, order_pk])

  console.log("result : " + result)

  return NextResponse.json({
    result: "Order updated successfully"
  })
}

export const DELETE = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {
  const {order_pk} = context.params

  const mysql = await mysql2Pool()
  const [result]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    DELETE FROM orders WHERE order_pk = ?
  `, [order_pk])

  console.log("result : " + result)

  return NextResponse.json({
    result: "Order deleted successfully"
  })
}
