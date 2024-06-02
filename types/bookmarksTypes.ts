import {SearchParams} from "./commonTypes"

export interface Bookmark {
  bookmark_pk: number
  product_pk: number
  user_pk: number
  name: string
  description: string
  price: number
  image_file: string
  created_at: string
}

export interface BookmarkSearchParams extends SearchParams {
  bookmark_pk?: number
  product_pk?: number
  user_pk?: number
  fromDate?: string
  toDate?: string
}