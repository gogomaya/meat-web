export const dynamic = "force-dynamic"

import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (_request: NextRequest) => {
  const mysql = await mysql2Pool()
  const [products_best_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      p.*, pi.file_name as image_file_name
    from products p
    left outer join products_images pi
    on
      p.product_pk = pi.product_pk and isnull(pi.uuid)
    where p.is_best
    order by p.product_pk desc
  `)
  return NextResponse.json({
    products_best: products_best_rows
  })
}
