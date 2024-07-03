import {SearchParams} from "./commonTypes"
import {ProductCategory} from "./productsTypes"

export interface OrderItem {
  order_item_pk: number
  order_pk: number
  quantity: number
  created_at: string
  product_pk: number
  name: string
  category: ProductCategory
  category_menu: string
  price: number | string
  discounted_price: number | string
  description?: string
  etc?: string
  origin?: string
  weight?: string
  type?: string
  part?: string
  per100g?: string
  stock: number | string
  grade?: string
  package?: string
  is_today: boolean
  is_best: boolean
  is_sold_out: boolean
  contents: string
  image_file_name: any
}

export interface OrderItemWithProductInfo extends OrderItem {
  product_name: string
  // 다른 제품 관련 정보를 필요한 만큼 추가할 수 있습니다.
}

export interface OrderItemSearchParams extends SearchParams {
  order_item_pk?: number
  order_pk?: number
  product_pk?: number
  fromDate?: string
  toDate?: string
}