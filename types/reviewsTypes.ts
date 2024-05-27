import {SearchParams} from "./commonTypes"

export interface Review {
  review_pk: number
  product_pk: number
  user_pk: number
  grade: number
  contents: string
  created_at?: string
  images?: File[]
  reviews_images?: ReviewsImage[]
  reviews_replies?: ReviewsReply[]
  reviews_likes?: ReviewsLike[]
  product_name?: string
  user_name?: string
}

export interface ReviewsImage {
  review_image_pk: number
  file_name: string
}

export interface ReviewsReply {
  review_pk: number
  review_reply_pk: number
  user_pk: number
  contents: string
  user_name?: string
}

export interface ReviewsLike {
  review_pk: number
  user_pk: number
  is_like: number
}

export interface ReviewsSearchParams extends SearchParams {
  product_pk: number
  user_pk: number
}

export interface ReviewsRepliesSearchParams extends SearchParams {
  review_pk: number
}
