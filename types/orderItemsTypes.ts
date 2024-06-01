export interface OrderItem {
    order_item_pk: number;
    order_pk: number;
    product_pk: number;
    quantity: number;
    price: number;
    created_at: string; // ISO 8601 포맷의 문자열 (예: "2024-06-02T12:34:56.789Z")
  }

export interface OrderItemWithProductInfo extends OrderItem {
  product_name: string;
  // 다른 제품 관련 정보를 필요한 만큼 추가할 수 있습니다.
}

export interface OrderItemSearchParams {
  order_pk?: number;
  product_pk?: number;
  fromDate?: string; // ISO 8601 포맷의 문자열 (예: "2024-06-01")
  toDate?: string; // ISO 8601 포맷의 문자열 (예: "2024-06-02")
}
