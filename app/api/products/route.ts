import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket, ResultSetHeader} from "mysql2/promise"
import fs from "fs"
import {fileUpload} from "@/app/api/ckeditor5/upload-images/route"
import {EmptyObject} from "@/types/commonTypes"
import {adminCheck} from "@/app/users/login/loginCheck"

// 원래 쿼리
// export const GET = async (request: NextRequest) => {
//   const searchParams = request.nextUrl.searchParams;
//   const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;
//   const page = (Number(searchParams.get("page")) || 0) * rowsPerPage;
//   const orderColumn = searchParams.get("orderColumn") || "product_order";
//   const orderDirection = searchParams.get("orderDirection") || "desc";
//   const query = searchParams.get("query") || "";
//   const category = searchParams.get("category") || "";
//   const category_menu = searchParams.get("category_menu") || "";
//   const is_today = searchParams.get("is_today") === "true";

//   const mysql = await mysql2Pool();

//   const [totalRows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
//     SELECT COUNT(*) AS total_rows
//     FROM products
//     WHERE
//       (TRIM(? = '') OR name LIKE CONCAT('%', ?, '%'))
//       AND (TRIM(? = '') OR category LIKE CONCAT('%', ?, '%'))
//       AND (TRIM(? = '') OR category_menu LIKE CONCAT('%', ?, '%'))
//       AND (TRIM(? = '') OR is_today = ?)
//   `, [query, query, category, category, category_menu, category_menu, is_today, is_today]);

//   const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
//     SELECT
//       p.*,
//       pi.file_name AS image_file_name,
//       po.product_order
//     FROM products p
//     LEFT JOIN products_images pi ON p.product_pk = pi.product_pk AND pi.uuid IS NULL
//     LEFT JOIN products_order po ON p.product_pk = po.product_pk
//     WHERE
//       (TRIM(? = '') OR p.name LIKE CONCAT('%', ?, '%'))
//       AND (TRIM(? = '') OR p.category LIKE CONCAT('%', ?, '%'))
//       AND (TRIM(? = '') OR p.category_menu LIKE CONCAT('%', ?, '%'))
//       AND (TRIM(? = '') OR p.is_today = ?)
//     ORDER BY po.prodct ${mysql.escapeId(orderColumn)} ${orderDirection}
//     LIMIT ?, ?
//   `, [query, query, category, category, category_menu, category_menu, is_today, is_today, page, rowsPerPage]);

//   return NextResponse.json({
//     products: rows,
//     total_rows: totalRows[0].total_rows
//   });
// };

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
  const page = (Number(searchParams.get("page")) || 0) * rowsPerPage
  const query = searchParams.get("query") || ""
  const category = searchParams.get("category") || ""
  const category_menu = searchParams.get("category_menu") || ""
  const is_today = searchParams.get("is_today") === "true"

  const mysql = await mysql2Pool()

  const [totalRows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT COUNT(*) AS total_rows
    FROM products
    WHERE
      (TRIM(?) = '' OR name LIKE CONCAT('%', ?, '%'))
      AND (TRIM(?) = '' OR category LIKE CONCAT('%', ?, '%'))
      AND (TRIM(?) = '' OR category_menu LIKE CONCAT('%', ?, '%'))
      AND (TRIM(?) = '' OR is_today = ?)
  `, [query, query, category, category, category_menu, category_menu, is_today, is_today])

  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    SELECT
      p.*,
      pi.file_name AS image_file_name,
      po.product_order
    FROM products p
    LEFT JOIN products_images pi ON p.product_pk = pi.product_pk AND pi.uuid IS NULL
    LEFT JOIN products_order po ON p.product_pk = po.product_pk
    WHERE
      (TRIM(?) = '' OR p.name LIKE CONCAT('%', ?, '%'))
      AND (TRIM(?) = '' OR p.category LIKE CONCAT('%', ?, '%'))
      AND (TRIM(?) = '' OR p.category_menu LIKE CONCAT('%', ?, '%'))
      AND (TRIM(?) = '' OR p.is_today = ?)
    ORDER BY po.product_order DESC
    LIMIT ?, ?
  `, [query, query, category, category, category_menu, category_menu, is_today, is_today, page, rowsPerPage])

  return NextResponse.json({
    products: rows,
    total_rows: totalRows[0].total_rows
  })
}

export const POST = async (request: NextRequest) => {
  await adminCheck(false)
  const searchParams = request.nextUrl.searchParams
  const uuid = searchParams.get("uuid") || "uuid"
  const mysql = await mysql2Pool()
  const product = {} as EmptyObject
  const formData = await request.formData()
  let fileName
  for (const [key, value] of formData.entries()) {
    if (key === "image") {
      fileName = await fileUpload(value as File, "products")
    } else if (key === "is_today" || key === "is_best" || key === "is_sold_out") {
      product[key] = JSON.parse(String(value))
    } else {
      product[key] = value
    }
  }

  const columns = [
    "name",
    "category",
    "category_menu",
    "price",
    "discounted_price",
    "description",
    "etc",
    "origin",
    "weight",
    "type",
    "part",
    "per100g",
    "stock",
    "grade",
    "package",
    "is_today",
    "is_best",
    "is_sold_out",
    "contents"
  ]
  const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(`
    insert into products (
      ${columns.join(", ")}
    ) values (
      ${columns.map(() => "?").join(", ")}
    )
  `, columns.map((column) => product[column]))
  await mysql.execute(`
    insert into products_images (
      product_pk, file_name
    ) values (
      ?, ?
    )
  `, [result.insertId, fileName])
  // products_order 최초 생성 = 상품등록시
  await mysql.execute(`
    insert into products_order (
      product_pk, product_order
    ) values (
      ?, ?
    )
  `, [result.insertId, result.insertId])

  await deleteNotUsedImages(result.insertId, uuid, product.contents)

  return NextResponse.json({
    result: "productsCreate"
  })
}

export const deleteNotUsedImages = async (
  product_pk: number, uuid: string, contents: string
) => {
  const mysql = await mysql2Pool()
  // uuid로 등록된 contents 안에 이미지들에게 product_pk 넣기
  await mysql.execute(`
    update products_images
    set product_pk = ?
    where uuid = ?
  `, [product_pk, uuid])

  // uuid로 등록된 이미지가 contents 안에 없으면 삭제
  const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      product_image_pk, file_name
    from products_images
    where
      product_pk = ? and not isnull(uuid)
  `, [product_pk])
  for (const row of rows) {
    if (!contents.includes(encodeURIComponent(row.file_name))) {
      await mysql.execute(`
        delete from products_images
        where product_image_pk = ?
      `, [row.product_image_pk])
      fs.rmSync(`../${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}/products/${row.file_name}`, {force: true})
    }
  }
}
