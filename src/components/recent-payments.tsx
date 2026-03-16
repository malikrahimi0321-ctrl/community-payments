type RecentPayment = {
  id: string;
  amount_paid: number;
  payment_status: string;
  payment_date: string | null;
  members?:
    | { full_name?: string | null }[]
    | { full_name?: string | null }
    | null;
};

type RecentPaymentsProps = {
  payments: RecentPayment[];
};

export default function RecentPayments({ payments }: RecentPaymentsProps) {
  function getMemberName(payment: RecentPayment) {
    if (Array.isArray(payment.members)) {
      return payment.members[0]?.full_name ?? "Unknown Member";
    }

    return payment.members?.full_name ?? "Unknown Member";
  }

  const realPayments = payments.filter(
    (payment) =>
      Number(payment.amount_paid) > 0 &&
      payment.payment_status !== "unpaid" &&
      payment.payment_date
  );

  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Recent Payments</h2>

      <div className="space-y-3">
        {realPayments.length === 0 ? (
          <p className="text-sm text-slate-500">No recent payments found.</p>
        ) : (
          realPayments.map((payment) => (
            <div key={payment.id} className="rounded-xl border p-3">
              <p className="font-medium">{getMemberName(payment)}</p>
              <p className="text-sm text-slate-600">
                ${Number(payment.amount_paid).toFixed(2)} • {payment.payment_status} •{" "}
                {payment.payment_date}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
