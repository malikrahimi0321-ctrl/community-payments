type RecentPayment = {
  id: string;
  amount_paid: number;
  payment_status: string;
  payment_date: string | null;
  members: { full_name: string | null }[] | null;
};

type RecentPaymentsProps = {
  payments: RecentPayment[];
};

export default function RecentPaymentsCard({
  payments,
}: RecentPaymentsProps) {
  const realPayments = payments.filter(
    (payment) =>
      Number(payment.amount_paid) > 0 &&
      payment.payment_status !== "unpaid" &&
      payment.payment_date
  );

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Recent Payments</h2>

      <div className="mt-4 space-y-3">
        {realPayments.length === 0 ? (
          <p className="text-sm text-slate-500">No recent payments found.</p>
        ) : (
          realPayments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">
                    {payment.members?.[0]?.full_name ?? "Unknown Member"}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {payment.payment_status}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">
                    ${Number(payment.amount_paid).toFixed(2)}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {payment.payment_date}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}