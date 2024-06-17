import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"


export const GET = async (
  request: NextRequest,
  context: { params: { order_pk: number } }
) => {
  const {order_pk} = context.params
  console.log(`/api/payments - order_pk : ${order_pk}`)
  try {
    const mysql = await mysql2Pool()
    const [payment]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM payments WHERE order_pk = ?
    `, [order_pk])

    if (payment.length === 0) {
      return NextResponse.error()
    }

    return NextResponse.json({
      message: "[API] - /api/payments/{order_pk} - 주문 조회 성공",
      status: 200,
      payment: payment[0]
    })
  } catch (error) {
    console.error("Error occurred while fetching payment:", error)
    return NextResponse.error()
  }
}



