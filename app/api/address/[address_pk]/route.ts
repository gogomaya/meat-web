import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {RowDataPacket, FieldPacket} from "mysql2/promise"

export const GET = async (
  request: NextRequest,
  context: {params: {address_pk: number}}
) => {
  const {address_pk} = context.params
  // console.log(`/api/address - address_pk : ${address_pk}`)
  try {
    const mysql = await mysql2Pool()
    const [address]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
      SELECT * FROM address WHERE address_pk = ?
    `, [address_pk])

    if (address.length === 0) {
      return NextResponse.error()
    }
    return NextResponse.json({
      status: 200,
      message: "[API] - /api/address/{address_pk} - 배송지 조회 성공",
      address: address[0]
    })
  } catch (error) {
    console.error("Error occurred while fetching address:", error)
    return NextResponse.error()
  }
}

export const PUT = async (
  request: NextRequest,
  context: {params: {address_pk: number}}
) => {
  const {address_pk} = context.params

  try {
    const formData = await request.formData()
    const user_pk = formData.get("user_pk")
    const mobile = formData.get("mobile")
    const recipient = formData.get("recipient")
    const address = formData.get("address")
    const address_detail = formData.get("address_detail")
    const is_primary = formData.get("is_primary") || 0

    // console.log(`address_pk : ${address_pk}`)
    // console.log(`user_pk : ${user_pk}`)
    // console.log(`is_primary : ${is_primary}`)
    const mysql = await mysql2Pool()
    if( is_primary == "1" ) {
      await  mysql.execute(`
        UPDATE address
        SET is_primary = 0
        WHERE user_pk = ?
      `, [user_pk])
    }

    await mysql.execute(`
      UPDATE address
      SET user_pk = ?, mobile = ?, recipient = ?, address = ?, address_detail = ?, is_primary = ?
      WHERE address_pk = ?
    `, [user_pk, mobile, recipient, address, address_detail, is_primary, address_pk])


    return NextResponse.json({
      message: "Address updated successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while updating address:", error)
    return NextResponse.error()
  }
}

export const DELETE = async (
  request: NextRequest,
  context: {params: {address_pk: number}}
) => {
  const {address_pk} = context.params

  try {
    const mysql = await mysql2Pool()
    await mysql.execute(`
      DELETE FROM address WHERE address_pk = ?
    `, [address_pk])

    return NextResponse.json({
      message: "Address deleted successfully",
      status: 200
    })
  } catch (error) {
    console.error("Error occurred while deleting address:", error)
    return NextResponse.error()
  }
}

