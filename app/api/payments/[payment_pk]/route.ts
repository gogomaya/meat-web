import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"


export const GET = async (
  request: NextRequest,
  context: { params: { payment_pk: number } }
) => {
  const {payment_pk} = context.params
  console.log(`/api/payments - payment_pk : ${payment_pk}`)
  try {
    const mysql = await mysql2Pool()
    const [payment]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM payments WHERE payment_pk = ?
    `, [payment_pk])

    if (payment.length === 0) {
      return NextResponse.error()
    }

    return NextResponse.json({
      message: "[API] - /api/payments/{payemnt_pk} - 주문 조회 성공",
      status: 200,
      payment: payment[0]
    })
  } catch (error) {
    console.error("Error occurred while fetching payment:", error)
    return NextResponse.error()
  }
}




export const PUT = async (
  request: NextRequest,
  context: { params: { payment_pk: number } }
) => {
  const {payment_pk} = context.params

  try {
    const formData = await request.formData()
    const order_pk = formData.get("order_pk")
    const payment_method = formData.get("payment_method") || null
    const status = formData.get("status")
    const pay_id = formData.get("pay_id") || null

    console.log(`payment_pk : ${payment_pk}`)
    const mysql = await mysql2Pool()

    await mysql.execute(`
      UPDATE payments
      SET order_pk = ?, payment_method = ?, status = ?, pay_id = ?
      WHERE payment_pk = ?
    `, [order_pk, payment_method, status, pay_id, payment_pk])

    return NextResponse.json({
      message: "Payment updated successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while updating payment:", error)
    return NextResponse.error()
  }
}





export const DELETE = async (
  request: NextRequest,
  context: { params: { payment_pk: number } }
) => {
  const {payment_pk} = context.params

  try {
    const mysql = await mysql2Pool()
    await mysql.execute(`
      DELETE FROM payments WHERE payment_pk = ?
    `, [payment_pk])

    return NextResponse.json({
      message: "Payment deleted successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while deleting payment:", error)
    return NextResponse.error()
  }
}

