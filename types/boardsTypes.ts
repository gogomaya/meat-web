import {SearchParams} from "./commonTypes"

export type BoardCategory = "notice" | "faq" | "qna"

export interface Board {
  board_pk: number
  category: string
  user_pk: number
  product_pk?: number
  title: string
  contents: string
  created_at?: string
  image?: File[]
  image_file_name?: string
  user_name?: string
  product_name?: string
  replies_count?: number
  boards_replies?: BoardsReply[]
}

export interface BoardsReply {
  board_reply_pk: number
  board_pk: number
  user_pk: number
  contents: string
  created_at?: string
}

export interface BoardsSearchParams extends SearchParams {
  category: string
  product_pk: number
}
