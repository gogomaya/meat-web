import {SearchParams} from "./commonTypes"

export type BoardCategory = "notice" | "faq" | "qna"

export interface Board {
  board_pk: number
  category: string
  user_pk: number
  title: string
  contents: string
  created_at?: string
  image?: File[]
  image_file_name?: string
}

export interface BoardReply {
  board_reply_pk: number
  board_pk: number
  user_pk: number
  contents: string
  created_at?: string
}

export interface BoardsSearchParams extends SearchParams {
  category: string
}
