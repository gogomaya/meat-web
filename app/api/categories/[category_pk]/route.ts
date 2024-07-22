import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {adminCheck} from "@/app/users/login/loginCheck"

export const DELETE = async (
  _request: NextRequest,
  context: {params: {category_pk: number}}
) => {
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      category_pk
    from categories
    where
      category_pk = ?
    limit 0, 1
  `, [context.params.category_pk])
  if (rows.length > 1) {
    return NextResponse.json({
      message: "해당 메뉴의 모든 상품을 삭제 후에 다시 시도 하세요."
    }, {status: 500})
  }
  await mysql.execute(`
    delete from categories
    where category_pk = ?
  `, [context.params.category_pk])
  return NextResponse.json({
    result: "categoriesDelete"
  })
}


export const PUT = async (
  request: NextRequest,
  context: { params: { category_pk: number } }
) => {
  const {category_pk} = context.params

  try {
    const formData = await request.formData()
    const name = formData.get("name") || null
    const id = formData.get("id") || null

    // console.log(`pyment_pk : ${payment_pk}`)
    const mysql = await mysql2Pool()

    await mysql.execute(`
      UPDATE categories
      SET 
        name = ?,
        id = ?
      WHERE category_pk = ?
    `, [name, id, category_pk])

    return NextResponse.json({
      message: "Category updated successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while updating Category:", error)
    return NextResponse.error()
  }
}