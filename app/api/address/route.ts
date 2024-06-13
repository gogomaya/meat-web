import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10
    const page = (Number(searchParams.get("page")) * rowsPerPage) || 0
    const orderColumn = searchParams.get("orderColumn") || "address_pk"
    const orderDirection = searchParams.get("orderDirection") || "desc"
    const query = searchParams.get("query") || ""
    const user_pk = searchParams.get("user_pk") || ""

    const mysql = await mysql2Pool()

    const [total_rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT COUNT(*) AS total_rows FROM address
      WHERE ("" = ? OR user_pk = ?)
    `, [user_pk, user_pk])

    const [addressList]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM address
      WHERE ("" = ? OR user_pk = ?)
      ORDER BY is_primary desc, ${orderColumn} ${orderDirection}
      LIMIT ?, ?
    `, [user_pk, user_pk, page, rowsPerPage])

    return NextResponse.json({
      addressList: addressList,
      total_rows: total_rows[0].total_rows
    })
  } catch (error) {
    console.error("Error occurred while fetching addresses:", error)
    return NextResponse.error()
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const user_pk = formData.get("user_pk")
    const mobile = formData.get("mobile")
    const recipient = formData.get("recipient")
    const address = formData.get("address")
    const address_detail = formData.get("address_detail")
    const is_primary = formData.get("is_primary") || 0

    const mysql = await mysql2Pool()
    // console.log(`user_pk : ${user_pk}`)
    // 새로운 주소 추가
    await mysql.execute(`
      INSERT INTO address (user_pk, mobile, recipient, address, address_detail, is_primary)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [user_pk, mobile, recipient, address, address_detail, is_primary])

    // 마지막으로 삽입된 address_pk 가져오기
    const [rows]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT LAST_INSERT_ID() as address_pk
    `)

    const address_pk = rows[0].address_pk

    return NextResponse.json({
      message: "Address created successfully",
      status: 200,
      address_pk: address_pk
    })

  } catch (error) {
    console.error("Error occurred while creating/deleting address:", error)
    return NextResponse.error()
  }
}
