import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {adminCheck} from "@/app/users/login/loginCheck"

export const GET = async (
  _request: NextRequest,
  context: {params: {user_pk: number}}
) => {

  try {
    const mysql = await mysql2Pool()
    const [users]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      select *
      from users
      where
        user_pk = ?
    `, [context.params.user_pk])

    if (users.length === 0) {
      return NextResponse.error()
    }

    return NextResponse.json({
      user: users[0]
    })
  } catch (error) {
    console.error("회원 조회 시 에러... : ", error)
    return NextResponse.error()
  }

}

export const PUT = async (
  request: NextRequest,
  context: {params: {user_pk: number}}
) => {
  const {user_pk} = context.params

  try {
    const formData = await request.formData()
    const user_pk = formData.get("user_pk")
    const name = formData.get("name")
    const mobile = formData.get("mobile")

    console.log(`user_pk : ${user_pk}`)
    console.log(`name : ${name}`)
    console.log(`mobile : ${mobile}`)
    const mysql = await mysql2Pool()

    await mysql.execute(`
      UPDATE users
      SET name = ?, mobile = ?
      WHERE user_pk = ?
    `, [name, mobile, user_pk])

    return NextResponse.json({
      message: "Users updated successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while updating address:", error)
    return NextResponse.error()
  }
}


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
