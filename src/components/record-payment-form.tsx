"use client";

export default function RecordPaymentForm() {
  return (
    <form className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Record Payment</h2>

      <input className="w-full rounded-xl border px-3 py-2" placeholder="Member ID" />
      <input className="w-full rounded-xl border px-3 py-2" placeholder="Month (1-12)" />
      <input className="w-full rounded-xl border px-3 py-2" placeholder="Year" />
      <input className="w-full rounded-xl border px-3 py-2" placeholder="Amount Due" />
      <input className="w-full rounded-xl border px-3 py-2" placeholder="Amount Paid" />

      <button type="submit" className="rounded-xl bg-green-600 px-4 py-2 text-white">
        Save Payment
      </button>
    </form>
  );
}