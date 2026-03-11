type Member = {
  id: string;
  full_name: string;
  status: string;
};

type Payment = {
  id: string;
  member_id: string;
  month: number;
  year: number;
  amount_due: number;
  amount_paid: number;
  payment_status: "paid" | "partial" | "unpaid";
};

type PaymentTableProps = {
  members: Member[];
  payments: Payment[];
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getBadge(status?: "paid" | "partial" | "unpaid") {
  if (status === "paid") return "bg-green-100 text-green-700";
  if (status === "partial") return "bg-yellow-100 text-yellow-700";
  if (status === "unpaid") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-500";
}

export default function PaymentTable({ members, payments }: PaymentTableProps) {

  // Calculate monthly totals
  const monthlyTotals = Array.from({ length: 12 }, (_, i) =>
    payments
      .filter((p) => p.month === i + 1)
      .reduce((sum, p) => sum + Number(p.amount_paid ?? 0), 0)
  );

  const totalCollected = monthlyTotals.reduce((sum, v) => sum + v, 0);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
            <th className="p-3 text-left font-semibold">Member</th>

            {months.map((month) => (
              <th key={month} className="p-3 text-center font-semibold">
                {month}
              </th>
            ))}

            <th className="p-3 text-right font-semibold">Total Paid</th>
            <th className="p-3 text-right font-semibold">Balance</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => {
            const memberPayments = payments.filter(
              (p) => p.member_id === member.id
            );

            const totalPaid = memberPayments.reduce(
              (sum, p) => sum + Number(p.amount_paid),
              0
            );

            const balance = memberPayments.reduce(
              (sum, p) => sum + (Number(p.amount_due) - Number(p.amount_paid)),
              0
            );

            return (
              <tr
                key={member.id}
                className="border-t border-slate-200 dark:border-slate-800"
              >
                <td className="p-3 font-medium text-slate-900 dark:text-slate-100">
                  {member.full_name}
                </td>

                {Array.from({ length: 12 }, (_, i) => i + 1).map((monthNum) => {
                  const payment = memberPayments.find(
                    (p) => p.month === monthNum
                  );

                  return (
                    <td key={monthNum} className="p-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getBadge(
                          payment?.payment_status
                        )}`}
                      >
                        {payment?.payment_status ?? "-"}
                      </span>
                    </td>
                  );
                })}

                <td className="p-3 text-right text-slate-900 dark:text-slate-100">
                  ${totalPaid.toFixed(2)}
                </td>

                <td className="p-3 text-right text-slate-900 dark:text-slate-100">
                  ${balance.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>

        {/* Monthly totals footer */}
        <tfoot>
          <tr className="border-t-2 border-slate-300 bg-slate-50 font-semibold dark:border-slate-700 dark:bg-slate-800">
            <td className="p-3 text-left">Monthly Total</td>

            {monthlyTotals.map((total, i) => (
              <td key={i} className="p-3 text-center">
                ${total.toFixed(2)}
              </td>
            ))}

            <td className="p-3 text-right">${totalCollected.toFixed(2)}</td>

            <td className="p-3 text-right">—</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}