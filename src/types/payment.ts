export type PaymentStatus = "paid" | "partial" | "unpaid";

export type Payment = {
  id: string;
  member_id: string;
  month: number;
  year: number;
  amount_due: number;
  amount_paid: number;
  payment_status: PaymentStatus;
  payment_date: string | null;
  note: string | null;
  recorded_by: string | null;
  created_at: string;
  updated_at: string;
};