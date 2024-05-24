import {SearchParams} from "./commonTypes"

export interface Review {
  review_pk: number
  product_pk: number
  user_pk: number
  grade: number
  contents: string
  created_at?: string
  images?: File[]
  review_images?: ReviewImage[]
  product_name?: string
  user_name?: string
}

export interface ReviewImage {
  review_image_pk: number
  file_name: string
}

export interface ReviewsSearchParams extends SearchParams {
  product_pk: number
}
