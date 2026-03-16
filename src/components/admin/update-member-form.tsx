"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

type Member = {
  id: string;
  full_name: string;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  notes?: string | null;
};

type UpdateMemberFormProps = {
  members: Member[];
};

export default function UpdateMemberForm({
  members,
}: UpdateMemberFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedMemberId),
    [members, selectedMemberId]
  );

  function handleChooseMember(memberId: string) {
    setSelectedMemberId(memberId);
    setMessage("");
    setError("");

    const member = members.find((item) => item.id === memberId);
    if (!member) {
      setFullName("");
      setPhone("");
      setEmail("");
      setStatus("active");
      setNotes("");
      return;
    }

    setFullName(member.full_name ?? "");
    setPhone(member.phone ?? "");
    setEmail(member.email ?? "");
    setStatus(member.status ?? "active");
    setNotes(member.notes ?? "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!selectedMemberId) {
      setError("Please select a member.");
      setLoading(false);
      return;
    }

    if (!fullName.trim()) {
      setError("Full name is required.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("members")
      .update({
        full_name: fullName.trim(),
        phone: phone.trim() || null,
        email: email.trim() || null,
        status,
        notes: notes.trim() || null,
      })
      .eq("id", selectedMemberId);

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage("Member updated successfully.");
    router.refresh();
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Update Member</h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose a member and update their profile details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Member</label>
          <select
            value={selectedMemberId}
            onChange={(e) => handleChooseMember(e.target.value)}
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
      </div>

      {selectedMember ? (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
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
              rows={4}
              className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
              placeholder="Optional notes"
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
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update Member"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
