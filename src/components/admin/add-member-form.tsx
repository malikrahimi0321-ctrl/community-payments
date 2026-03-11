"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function AddMemberForm() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("members").insert([
      {
        full_name: fullName.trim(),
        phone: phone.trim() || null,
        email: email.trim() || null,
        status,
        notes: notes.trim() || null,
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Member added successfully.");
    setFullName("");
    setPhone("");
    setEmail("");
    setStatus("active");
    setNotes("");

    router.refresh();
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add Member</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add a new member to the database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
            placeholder="Enter phone"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
            placeholder="Optional notes"
            rows={4}
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
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
}