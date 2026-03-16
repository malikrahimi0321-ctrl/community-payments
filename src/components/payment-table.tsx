"use client";

import { useMemo, useState } from "react";

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
  currentMonth: number;
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

function getCellStyles(
  payment?: Payment,
  isCurrentMonth?: boolean
) {
  if (!payment) {
    return isCurrentMonth
      ? "bg-cyan-50 text-slate-500 ring-1 ring-cyan-200"
      : "bg-slate-50 text-slate-500 ring-1 ring-slate-200";
  }

  if (payment.payment_status === "paid") {
    return isCurrentMonth
      ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }

  if (payment.payment_status === "partial") {
    return isCurrentMonth
      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  }

  return isCurrentMonth
    ? "bg-rose-100 text-rose-700 ring-1 ring-rose-300"
    : "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
}

export default function PaymentTable({
  members,
  payments,
  currentMonth,
}: PaymentTableProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "paid" | "partial" | "unpaid"
  >("all");

  const paymentMap = useMemo(() => {
    return new Map(
      payments.map((payment) => [
        `${payment.member_id}-${payment.month}`,
        payment,
      ])
    );
  }, [payments]);

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members.filter((member) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        member.full_name.toLowerCase().includes(normalizedQuery);

      if (!matchesQuery) {
        return false;
      }

      if (statusFilter === "all") {
        return true;
      }

      const currentPayment = paymentMap.get(`${member.id}-${currentMonth}`);

      if (statusFilter === "unpaid") {
        return !currentPayment || currentPayment.payment_status === "unpaid";
      }

      return currentPayment?.payment_status === statusFilter;
    });
  }, [currentMonth, members, paymentMap, query, statusFilter]);

  const monthlyTotals = Array.from({ length: 12 }, (_, i) =>
    payments
      .filter((payment) => payment.month === i + 1)
      .reduce((sum, payment) => sum + Number(payment.amount_paid ?? 0), 0)
  );

  const totalCollected = monthlyTotals.reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search member name"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400 lg:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Paid", value: "paid" },
            { label: "Partial", value: "partial" },
            { label: "Unpaid", value: "unpaid" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                statusFilter === option.value
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() =>
                setStatusFilter(
                  option.value as "all" | "paid" | "partial" | "unpaid"
                )
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No members match the current search or filter.
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-xl">
        <div className="max-h-[70vh] overflow-auto overscroll-contain">
          <table className="min-w-[980px] border-collapse text-xs sm:min-w-[1100px] sm:text-sm">
            <colgroup>
              <col className="w-[110px] sm:w-[170px]" />
              {months.map((month) => (
                <col key={month} className="w-[72px] sm:w-[88px]" />
              ))}
              <col className="w-[96px] sm:w-[120px]" />
            </colgroup>

            <thead>
              <tr className="bg-slate-800/95 text-slate-100">
                <th className="sticky left-0 top-0 z-20 bg-slate-800 px-3 py-3 text-left text-sm font-semibold sm:px-5 sm:py-5 sm:text-base">
                  Member
                </th>

                {months.map((month) => (
                  <th
                    key={month}
                    className="sticky top-0 z-10 bg-slate-800 px-2 py-3 text-center text-sm font-semibold sm:px-4 sm:py-5 sm:text-base"
                  >
                    {month}
                  </th>
                ))}

                <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3 text-right text-sm font-semibold sm:px-5 sm:py-5 sm:text-base">
                  Total Paid
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member) => {
                const totalPaid = Array.from({ length: 12 }, (_, i) =>
                  paymentMap.get(`${member.id}-${i + 1}`)
                ).reduce(
                  (sum, payment) => sum + Number(payment?.amount_paid ?? 0),
                  0
                );

                return (
                  <tr
                    key={member.id}
                    className="border-t border-slate-800 text-slate-100"
                  >
                    <td className="sticky left-0 bg-slate-900 px-2 py-4 text-left text-sm font-medium sm:px-4 sm:py-5 sm:text-lg">
                      <span className="block max-w-[92px] whitespace-normal sm:max-w-[140px]">
                        {member.full_name}
                      </span>
                    </td>

                    {Array.from({ length: 12 }, (_, i) => i + 1).map((monthNum) => {
                      const payment = paymentMap.get(`${member.id}-${monthNum}`);
                      const isCurrentMonth = monthNum === currentMonth;

                      return (
                        <td
                          key={monthNum}
                          className="px-2 py-4 text-center sm:px-3 sm:py-5"
                        >
                          <span
                            className={`inline-flex min-w-12 justify-center rounded-full px-2 py-1 text-xs font-semibold sm:min-w-16 sm:px-3 sm:py-1.5 sm:text-sm ${getCellStyles(
                              payment,
                              isCurrentMonth
                            )}`}
                          >
                            {payment
                              ? `$${Number(payment.amount_paid ?? 0).toFixed(2)}`
                              : "-"}
                          </span>
                        </td>
                      );
                    })}

                    <td className="px-3 py-4 text-right text-base font-semibold text-slate-100 sm:px-5 sm:py-5 sm:text-xl">
                      ${totalPaid.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="border-t border-slate-800 bg-slate-900/80">
                <td className="sticky left-0 bg-slate-900 px-3 py-4 text-left text-sm font-semibold text-slate-200 sm:px-5 sm:py-5 sm:text-base">
                  Monthly Total
                </td>

                {monthlyTotals.map((total, index) => (
                  <td key={months[index]} className="px-2 py-4 text-center sm:px-3 sm:py-5">
                    <span
                      className={`inline-flex min-w-12 justify-center rounded-full px-2 py-1 text-xs font-semibold sm:min-w-16 sm:px-3 sm:py-1.5 sm:text-sm ${
                        index + 1 === currentMonth
                          ? "bg-cyan-100 text-cyan-800"
                          : "bg-slate-800 text-slate-100"
                      }`}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </td>
                ))}

                <td className="px-3 py-4 text-right text-base font-semibold text-white sm:px-5 sm:py-5 sm:text-xl">
                  ${totalCollected.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
