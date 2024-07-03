import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {stat} from "fs"

export const GET = async (
  request: NextRequest,
  context: {params: {order_pk: number}}
) => {

  const mysql = await mysql2Pool()
  // 마지막으로 삽입된 레코드의 AUTO_INCREMENT 값 가져오기
  // const [pk]: [RowDataPacket[], FieldPacket[]] = await mysql.execute("SELECT LAST_INSERT_ID() order_pk FROM dual")
  const [pk]: [RowDataPacket[], FieldPacket[]] = await mysql.execute("SELECT MAX(order_pk) order_pk FROM orders")
  const order_pk = pk[0]["order_pk"]
  // console.log(`등록된 주문번호 - order_pk : ${order_pk}`)

  return NextResponse.json({
    message: "Payment created successfully",
    status: 200,
    order_pk: order_pk
  })
}

