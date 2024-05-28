import {NextRequest, NextResponse} from "next/server"
import mysql2Pool from "@/libraries/mysql2Pool"
import {FieldPacket, ResultSetHeader, RowDataPacket} from "mysql2/promise"
import {loginCheck} from "@/app/users/login/loginCheck"

export const GET = async (
  _request: NextRequest,
  context: {params: {review_pk: number}}
) => {
  const mysql = await mysql2Pool()
  const [reviews_likes]: [RowDataPacket[], FieldPacket[]] = await mysql.execute(`
    select
      user_pk, is_like
    from reviews_likes
    where
      review_pk = ?
    `, [context.params.review_pk])
  return NextResponse.json({
    reviews_likes
  })
}

export const PUT = async (request: NextRequest) => {
  await loginCheck(true)
  const mysql = await mysql2Pool()
  const like = await request.json()
  // 좋아요나 싫어요를 2번 눌렀을때 내역 삭제
  const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(`
    delete from reviews_likes
    where
      review_pk = ? and user_pk = ? and is_like = ?
    `, [like.review_pk, like.user_pk, like.is_like])
  // 삭제 내역이 없을 경우 생성
  if (result.affectedRows === 0) {
    await mysql.execute(`
      insert into reviews_likes (review_pk, user_pk, is_like) values (?, ?, ?)
      on duplicate key update is_like = ?;
    `, [like.review_pk, like.user_pk, like.is_like, like.is_like])
  }

  return NextResponse.json({
    result: "reviewsLikesCreate"
  })
}
