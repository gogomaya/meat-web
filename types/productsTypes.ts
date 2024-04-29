import {SearchParams} from "./commonTypes"

export type Category = "cow" | "pork" | "simple"

export interface Product {
  product_pk: number
  name: string
  category: Category
  category_menu: string
  description: string
  from: string
  weight: string
  type: string
  part: string
  per100g: string
  grade: string
  package: string
  price: number
  is_today: boolean
  is_main: boolean
  is_best: boolean
  is_sold_out: boolean
  contents: string
  created_at?: string
  image?: File[]
  image_file_name?: string
}

export interface ProductsSearchParams extends SearchParams {
  category_menu: string
}
