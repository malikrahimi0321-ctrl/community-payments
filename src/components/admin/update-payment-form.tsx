"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Member = {
  id: string;
  full_name: string;
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
  note?: string | null;
};

type UpdatePaymentFormProps = {
  members: Member[];
  payments: Payment[];
};

const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function UpdatePaymentForm({
  members,
  payments,
}: UpdatePaymentFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const memberPayments = useMemo(() => {
    if (!selectedMemberId) return [];
    return payments
      .filter((payment) => payment.member_id === selectedMemberId)
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
  }, [payments, selectedMemberId]);

  const selectedPayment = useMemo(() => {
    return memberPayments.find((payment) => payment.id === selectedPaymentId);
  }, [memberPayments, selectedPaymentId]);

  const derivedStatus = useMemo(() => {
    const due = Number(amountDue);
    const paid = Number(amountPaid);

    if (!paid || paid <= 0) return "unpaid";
    if (paid < due) return "partial";
    return "paid";
  }, [amountDue, amountPaid]);

  function handleChoosePayment(paymentId: string) {
    setSelectedPaymentId(paymentId);

    const payment = memberPayments.find((p) => p.id === paymentId);
    if (!payment) return;

    setAmountDue(String(payment.amount_due));
    setAmountPaid(String(payment.amount_paid));
    setPaymentDate(payment.payment_date ?? "");
    setNote(payment.note ?? "");
    setMessage("");
    setError("");
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!selectedPaymentId) {
      setError("Please select a payment record.");
      setLoading(false);
      return;
    }

    const due = Number(amountDue);
    const paid = Number(amountPaid);

    if (due < 0 || paid < 0) {
      setError("Amounts cannot be negative.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("payments")
      .update({
        amount_due: due,
        amount_paid: paid,
        payment_status: derivedStatus,
        payment_date: paymentDate || null,
        note: note.trim() || null,
      })
      .eq("id", selectedPaymentId);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Payment updated successfully.");
    router.refresh();
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Update Existing Payment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a member and update a recorded payment.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Member</label>
          <select
            value={selectedMemberId}
            onChange={(e) => {
              setSelectedMemberId(e.target.value);
              setSelectedPaymentId("");
              setAmountDue("");
              setAmountPaid("");
              setPaymentDate("");
              setNote("");
              setMessage("");
              setError("");
            }}
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
          <label className="mb-1 block text-sm font-medium">Payment Record</label>
          <select
            value={selectedPaymentId}
            onChange={(e) => handleChoosePayment(e.target.value)}
            disabled={!selectedMemberId}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none disabled:bg-slate-100"
          >
            <option value="">Select payment record</option>
            {memberPayments.map((payment) => (
              <option key={payment.id} value={payment.id}>
                {monthNames[payment.month]} {payment.year} - {payment.payment_status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPayment && (
        <form onSubmit={handleUpdate} className="mt-6 grid gap-4 md:grid-cols-2">
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
              value={derivedStatus}
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
              className="rounded-2xl bg-amber-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Payment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}