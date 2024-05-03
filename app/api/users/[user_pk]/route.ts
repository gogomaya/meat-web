import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {adminCheck} from "@/app/admin/page"

export const DELETE = async (
  _request: NextRequest,
  context: {params: {user_pk: number}}
) => {
  await adminCheck(false)
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      user_pk
    from users
    where
      user_pk = ? and is_admin = true
  `, [context.params.user_pk])
  if (rows.length) {
    return NextResponse.json({
      message: "해당 회원은 관리자 입니다. 삭제할 수 없습니다."
    }, {status: 500})
  }
  await mysql.execute(`
    delete from users
    where user_pk = ?
  `, [context.params.user_pk])
  return NextResponse.json({
    result: "usersDelete"
  })
}
