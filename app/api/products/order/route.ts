import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {Product} from "@/types/productsTypes"

// export const PATCH = async (request: NextRequest) => {
//   const products: Product[] = await request.json()
//   const mysql = await mysql2Pool()
//   await mysql.execute(`
//     delete from products_order
//   `)
//   for (const key in products) {
//     await mysql.execute(`
//       insert into products_order (
//         product_pk, product_order
//       ) values (
//         ?, ?
//       )
//     `, [products[key].product_pk, key])
//   }
//   for (const key in products) {
//     await mysql.execute(`
//       UPDATE products_order
//       SET product_order = ?
//       WHERE product_pk = ?
//     `, [key, products[key].product_pk]);
//   }
//   return NextResponse.json({
//     result: "productsOrder"
//   })
// }

export const PATCH = async (request: NextRequest) => {
  const productsOrder: { product_pk: number, product_order: number }[] = await request.json()
  const mysql = await mysql2Pool()

  for (const product of productsOrder) {
    await mysql.execute(`
      UPDATE products_order
      SET product_order = ?
      WHERE product_pk = ?
    `, [product.product_order, product.product_pk])
  }

  return NextResponse.json({
    result: "productsOrder"
  })
}
