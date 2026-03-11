export type Member = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  status: "active" | "inactive";
  join_date: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};