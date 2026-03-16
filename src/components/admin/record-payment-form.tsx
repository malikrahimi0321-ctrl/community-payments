"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Member = {
  id: string;
  full_name: string;
};

type RecordPaymentFormProps = {
  members: Member[];
  initialMonth: number;
  initialYear: number;
};

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export default function RecordPaymentForm({
  members,
  initialMonth,
  initialYear,
}: RecordPaymentFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [memberId, setMemberId] = useState("");
  const [month, setMonth] = useState(String(initialMonth));
  const [year, setYear] = useState(String(initialYear));
  const [amountDue, setAmountDue] = useState("100");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const paymentStatus = useMemo(() => {
    const due = Number(amountDue);
    const paid = Number(amountPaid);

    if (!paid || paid <= 0) return "unpaid";
    if (paid < due) return "partial";
    return "paid";
  }, [amountDue, amountPaid]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!memberId) {
      setError("Please select a member.");
      setLoading(false);
      return;
    }

    const due = Number(amountDue);
    const paid = Number(amountPaid || 0);
    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    if (!selectedMonth || selectedMonth < 1 || selectedMonth > 12) {
      setError("Please select a valid month.");
      setLoading(false);
      return;
    }

    if (!selectedYear || selectedYear < 2000 || selectedYear > 2100) {
      setError("Please enter a valid year.");
      setLoading(false);
      return;
    }

    if (due < 0 || paid < 0) {
      setError("Amounts cannot be negative.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("payments").upsert(
      [
        {
          member_id: memberId,
          month: selectedMonth,
          year: selectedYear,
          amount_due: due,
          amount_paid: paid,
          payment_status: paymentStatus,
          payment_date: paymentDate || null,
          note: note.trim() || null,
        },
      ],
      {
        onConflict: "member_id,month,year",
      }
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Payment saved successfully.");
    setAmountPaid("");
    setPaymentDate("");
    setNote("");

    router.refresh();
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Record Payment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Save a member payment for a specific month.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Member</label>
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Select member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.full_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Amount Due</label>
          <input
            type="number"
            step="0.01"
            value={amountDue}
            onChange={(e) => setAmountDue(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Amount Paid</label>
          <input
            type="number"
            step="0.01"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Payment Date</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <input
            value={paymentStatus}
            readOnly
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
            placeholder="Optional note"
          />
        </div>

        {error ? (
          <div className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="md:col-span-2 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Record Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
