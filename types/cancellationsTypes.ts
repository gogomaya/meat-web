import {SearchParams} from "./commonTypes"

export interface Cancellation {
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
}

export interface CancellationSearchParams extends SearchParams {
  cancellation_pk?: number;
  order_pk?: number;
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
