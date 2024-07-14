import {SearchParams} from "./commonTypes"

export type CancellationStatus = "pending" | "complete"
// 취소대기, 처리완료

export interface Cancellation {
  user_pk: string;
  total_discount_price: string;
  total_count: string;
  title: string;
  cancellation_pk: number;
  order_pk: number;
  type: "cancel" | "return";
  status: "pending" | "complete";
  description?: string;
  is_confirmed: boolean;
  is_refund: boolean;
  account_number?: string;
  bank_name?: string;
  depositor?: string;
  created_at: string;
  completed_at?: string;
  ordered_at: string;
}

export interface CancellationSearchParams extends SearchParams {
  cancellation_pk: number;
  order_pk: number;
  type?: "cancel" | "return";
  status?: "pending" | "complete";
  description?: string;
  is_confirmed?: boolean;
  is_refund?: boolean;
  account_number?: string;
  bank_name?: string;
  depositor?: string;
  fromDate?: string;
  toDate?: string;
}
