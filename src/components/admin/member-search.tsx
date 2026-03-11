"use client";

import { useMemo, useState } from "react";

type Member = {
  id: string;
  full_name: string;
  household_name?: string | null;
  status?: string;
};

type Payment = {
  id: string;
  member_id: string;
  month: number;
  year: number;
  amount_due: number;
  amount_paid: number;
  payment_status: "paid" | "partial" | "unpaid";
  payment_date: string | null;
};

type MemberSearchProps = {
  members: Member[];
  payments: Payment[];
};

const monthNames = [
  "",
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

export default function MemberSearch({
  members,
  payments,
}: MemberSearchProps) {
  const [query, setQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return members.filter((member) =>
      member.full_name.toLowerCase().includes(q)
    );
  }, [members, query]);

  function getMemberPayments(memberId: string) {
    return payments
      .filter((payment) => payment.member_id === memberId)
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold">Search Member</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search a member and view all payments recorded so far.
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search member..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none"
        />
      </div>

      {query.trim() && (
        <div className="mt-6 space-y-6">
          {filteredMembers.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-500">
              No matching member found.
            </div>
          ) : (
            filteredMembers.map((member) => {
              const memberPayments = getMemberPayments(member.id);

              return (
                <div
                  key={member.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">{member.full_name}</h3>
                    <p className="text-sm text-slate-500">
                      {member.household_name ?? "No household"} •{" "}
                      {member.status ?? "active"}
                    </p>
                  </div>

                  {memberPayments.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No payments recorded yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-left text-slate-500">
                            <th className="pb-3 pr-4 font-medium">Month</th>
                            <th className="pb-3 pr-4 font-medium">Year</th>
                            <th className="pb-3 pr-4 font-medium">Due</th>
                            <th className="pb-3 pr-4 font-medium">Paid</th>
                            <th className="pb-3 pr-4 font-medium">Status</th>
                            <th className="pb-3 pr-4 font-medium">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {memberPayments.map((payment) => (
                            <tr
                              key={payment.id}
                              className="border-b border-slate-100 last:border-0"
                            >
                              <td className="py-3 pr-4">
                                {monthNames[payment.month]}
                              </td>
                              <td className="py-3 pr-4">{payment.year}</td>
                              <td className="py-3 pr-4">
                                ${Number(payment.amount_due).toFixed(2)}
                              </td>
                              <td className="py-3 pr-4">
                                ${Number(payment.amount_paid).toFixed(2)}
                              </td>
                              <td className="py-3 pr-4">
                                <span
                                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                                    payment.payment_status === "paid"
                                      ? "bg-green-100 text-green-700"
                                      : payment.payment_status === "partial"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {payment.payment_status}
                                </span>
                              </td>
                              <td className="py-3 pr-4">
                                {payment.payment_date ?? "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}