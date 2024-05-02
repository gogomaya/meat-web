import {SearchParams} from "./commonTypes"

export type ProductCategory = "cow" | "pork" | "simple"

export interface Product {
  product_pk: number
  name: string
  category: ProductCategory
  category_menu: string
  price: number | string
  description?: string
  origin?: string
  weight?: string
  type?: string
  part?: string
  per100g?: string
  grade?: string
  package?: string
  is_today: boolean
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