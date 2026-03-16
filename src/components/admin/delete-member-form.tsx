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
};

type DeleteMemberFormProps = {
  members: Member[];
};

export default function DeleteMemberForm({
  members,
}: DeleteMemberFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedMemberId),
    [members, selectedMemberId]
  );

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!selectedMemberId || !selectedMember) {
      setError("Please select a member.");
      setLoading(false);
      return;
    }

    if (confirmationText.trim() !== selectedMember.full_name) {
      setError("Type the member name exactly to confirm deletion.");
      setLoading(false);
      return;
    }

    const { error: deleteError } = await supabase
      .from("members")
      .delete()
      .eq("id", selectedMemberId);

    setLoading(false);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setMessage("Member deleted successfully.");
    setSelectedMemberId("");
    setConfirmationText("");
    router.refresh();
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Delete Member</h2>
        <p className="mt-1 text-sm text-slate-500">
          Permanently remove a member record after confirmation.
        </p>
      </div>

      <form onSubmit={handleDelete} className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Member</label>
          <select
            value={selectedMemberId}
            onChange={(e) => {
              setSelectedMemberId(e.target.value);
              setConfirmationText("");
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

        {selectedMember ? (
          <>
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              This will permanently delete <strong>{selectedMember.full_name}</strong>.
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Type the member name to confirm
              </label>
              <input
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
                placeholder={selectedMember.full_name}
              />
            </div>
          </>
        ) : null}

        {error ? (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        ) : null}

        <div>
          <button
            type="submit"
            disabled={loading || !selectedMember}
            className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
