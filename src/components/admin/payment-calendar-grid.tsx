type Member = {
  id: string;
  full_name: string;
};

type Payment = {
  member_id: string;
  month: number;
  payment_status: "paid" | "partial" | "unpaid";
};

const monthLabels = [
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

export default function PaymentCalendarGrid({
  members,
  payments,
}: {
  members: Member[];
  payments: Payment[];
}) {
  function getStatus(memberId: string, month: number) {
    const payment = payments.find(
      (p) => p.member_id === memberId && p.month === month
    );

    return payment?.payment_status ?? "-";
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Payment Calendar Grid
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-3 pr-4 font-medium">Member</th>
              {monthLabels.map((label) => (
                <th key={label} className="px-3 text-center">
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-slate-100">
                <td className="py-4 pr-4 font-semibold">
                  {member.full_name}
                </td>

                {Array.from({ length: 12 }, (_, i) => {
                  const status = getStatus(member.id, i + 1);

                  return (
                    <td key={i} className="text-center py-3">
                      {status}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
