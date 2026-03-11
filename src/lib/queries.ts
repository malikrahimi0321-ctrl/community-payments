import { createClient } from "@/utils/supabase/server";

export async function getMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) {
  throw new Error(error.message);
  }
  return data ?? [];
}

export async function getPayments(year: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("year", year);

  if (error) {
  throw new Error(error.message);
  }
  return data ?? [];
}

export async function getRecentPayments(limit = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("payments")
    .select(`
      id,
      amount_paid,
      payment_status,
      payment_date,
      member_id,
      members (
        full_name
      )
    `)
    .gt("amount_paid", 0)
    .neq("payment_status", "unpaid")
    .not("payment_date", "is", null)
    .order("payment_date", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getDashboardStats(year: number, month: number) {
  const supabase = await createClient();

  const [
    { count: totalMembers, error: membersError },
    { data: monthPayments, error: monthPaymentsError },
    { data: yearPayments, error: yearPaymentsError },
    { data: allPayments, error: allPaymentsError },
  ] = await Promise.all([
    supabase.from("members").select("*", { count: "exact", head: true }),

    supabase
      .from("payments")
      .select("member_id, amount_paid, payment_status")
      .eq("year", year)
      .eq("month", month),

    supabase
      .from("payments")
      .select("amount_paid")
      .eq("year", year),

    supabase
      .from("payments")
      .select("amount_paid"),
  ]);

  if (membersError) throw new Error(membersError.message);
  if (monthPaymentsError) throw new Error(monthPaymentsError.message);
  if (yearPaymentsError) throw new Error(yearPaymentsError.message);
  if (allPaymentsError) throw new Error(allPaymentsError.message);

  const total = totalMembers ?? 0;
  const currentMonthPayments = monthPayments ?? [];
  const currentYearPayments = yearPayments ?? [];
  const lifetimePayments = allPayments ?? [];

  const paidMemberIds = new Set(
    currentMonthPayments
      .filter((p) => p.payment_status === "paid")
      .map((p) => p.member_id)
  );

  const unpaidThisMonth = Math.max(0, total - paidMemberIds.size);

  const monthlyCollected = currentMonthPayments.reduce(
    (sum, p) => sum + Number(p.amount_paid ?? 0),
    0
  );

  const yearlyCollected = currentYearPayments.reduce(
    (sum, p) => sum + Number(p.amount_paid ?? 0),
    0
  );

  const totalCollected = lifetimePayments.reduce(
    (sum, p) => sum + Number(p.amount_paid ?? 0),
    0
  );

  return {
    totalMembers: total,
    paidThisMonth: paidMemberIds.size,
    unpaidThisMonth,
    monthlyCollected,
    yearlyCollected,
    totalCollected,
  };
}