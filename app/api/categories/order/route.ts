import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {Category} from "@/types/categoryTypes"

export const PATCH = async (request: NextRequest) => {
  const categories: Category[] = await request.json()
  const mysql = await mysql2Pool()
  await mysql.execute(`
    delete from categories_order
  `)
  for (const key in categories) {
    await mysql.execute(`
      insert into categories_order (
        category_pk, category_order
      ) values (
        ?, ?
      )
    `, [categories[key].category_pk, key])
  }
  return NextResponse.json({
    result: "categoriesOrder"
  })
}
