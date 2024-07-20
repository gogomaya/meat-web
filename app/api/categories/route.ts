import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"
import {adminCheck} from "@/app/users/login/loginCheck"

export const GET = async (_request: NextRequest) => {
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      c.*, co.category_order
    from categories c
    left outer join categories_order co
    on c.category_pk = co.category_pk
    order by co.category_order asc, c.category_pk
  `)
  return NextResponse.json({
    categories: rows
  })
}

export const POST = async (request: NextRequest) => {
  const category = await request.json()
  const mysql = await mysql2Pool()
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      category_pk
    from categories
    where
      name = ? or id = ?
  `, [category.name, category.id])
  if (rows.length) {
    return NextResponse.json({
      message: "이름 또는 URL 영문주소를 사용할 수 없습니다."
    }, {status: 500})
  }
  await mysql.execute(`
    insert into categories (
      name, id
    ) values (
      ?, ?
    )
  `, [category.name, category.id])
  return NextResponse.json({
    result: "categoriesCreate"
  })
}
