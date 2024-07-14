import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"


export const GET = async (
  request: NextRequest,
  context: { params: { cancellation_pk: number } }
) => {
  const {cancellation_pk} = context.params

  try {
    const mysql = await mysql2Pool()
    const [cancellation]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(
      `
      SELECT c.* 
            ,o.*
            ,o.created_at as ordered_at
            ,c.status as status
            ,o.status as order_status
      FROM cancellations c JOIN orders o ON (c.order_pk = o.order_pk)
      WHERE cancellation_pk = ?
    `,
      [cancellation_pk]
    )

    if (cancellation.length === 0) {
      return NextResponse.error()
    }

    return NextResponse.json({
      status: 200,
      message: `[API] - /api/cancellation/${cancellation_pk} - Cancellation 조회 성공`,
      cancellation: cancellation[0]
    })
  } catch (error) {
    console.error("Error occurred while fetching cancellation:", error)
    return NextResponse.error()
  }
}




export const PUT = async (
  request: NextRequest,
  context: { params: { cancellation_pk: number } }
) => {
  const {cancellation_pk} = context.params

  try {
    const formData = await request.formData()

    const order_pk = formData.get("order_pk")
    const type = formData.get("type")
    const status = formData.get("status")
    const description = formData.get("description")
    const is_confirmed = formData.get("is_confirmed") === "true"
    const is_refund = formData.get("is_refund") === "true"
    const account_number = formData.get("account_number")
    const bank_name = formData.get("bank_name")
    const depositor = formData.get("depositor")

    console.log(`is_confirmed : ${is_confirmed}`)
    console.log(`is_refund : ${is_refund}`)


    const mysql = await mysql2Pool()

    await mysql.execute(
      `
        UPDATE cancellations
        SET order_pk = ?
          , type = ?
          , status = ?
          , description = ?
          , is_confirmed = ?
          , is_refund = ?
          , account_number = ?
          , bank_name = ?
          , depositor = ?
        WHERE cancellation_pk = ?
      `,
      [
        order_pk,
        type,
        status,
        description,
        is_confirmed,
        is_refund,
        account_number,
        bank_name,
        depositor,
        cancellation_pk
      ]
    )

    return NextResponse.json({
      status: 200,
      message: "Cancellation updated successfully"
    })
  } catch (error) {
    console.error("취소 정보를 업데이트하는 중 오류가 발생했습니다:", error)
    return NextResponse.error()
  }
}




export const DELETE = async (
  request: NextRequest,
  context: { params: { cancellation_pk: number } }
) => {
  const {cancellation_pk} = context.params

  try {
    const mysql = await mysql2Pool()
    await mysql.execute(
      `
        DELETE FROM cancellations WHERE cancellation_pk = ?
      `,
      [cancellation_pk]
    )

    return NextResponse.json({
      status: 200,
      message: "Cancellation deleted successfully"
    })
  } catch (error) {
    console.error("취소 정보를 삭제하는 중 오류가 발생했습니다:", error)
    return NextResponse.error()
  }
}