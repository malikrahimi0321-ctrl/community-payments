"use client";

import { useEffect, useState, type ReactNode } from "react";

import AddMemberForm from "@/components/admin/add-member-form";
import DeleteMemberForm from "@/components/admin/delete-member-form";
import RecordPaymentForm from "@/components/admin/record-payment-form";
import UpdateMemberForm from "@/components/admin/update-member-form";
import UpdatePaymentForm from "@/components/admin/update-payment-form";

type Member = {
  id: string;
  full_name: string;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  notes?: string | null;
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

type ModalKey =
  | "add-member"
  | "update-member"
  | "delete-member"
  | "record-payment"
  | "update-payment"
  | null;

type AdminQuickActionsProps = {
  members: Member[];
  payments: Payment[];
  initialMonth: number;
  initialYear: number;
};

function Modal({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-slate-100 p-4 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4 px-1">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>

          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function AdminQuickActions({
  members,
  payments,
  initialMonth,
  initialYear,
}: AdminQuickActionsProps) {
  const [openModal, setOpenModal] = useState<ModalKey>(null);

  return (
    <>
      <div className="mt-3 space-y-2">
        <button
          type="button"
          className="block w-full rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white"
          onClick={() => setOpenModal("add-member")}
        >
          Add Member
        </button>

        <button
          type="button"
          className="block w-full rounded-xl border border-blue-300 bg-blue-50 px-3 py-2 text-center text-sm font-medium text-blue-700"
          onClick={() => setOpenModal("update-member")}
        >
          Update Member
        </button>

        <button
          type="button"
          className="block w-full rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-700"
          onClick={() => setOpenModal("delete-member")}
        >
          Delete Member
        </button>

        <button
          type="button"
          className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-sm font-medium text-slate-700"
          onClick={() => setOpenModal("record-payment")}
        >
          Record Payment
        </button>

        <button
          type="button"
          className="block w-full rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm font-medium text-amber-700"
          onClick={() => setOpenModal("update-payment")}
        >
          Update Payment
        </button>
      </div>

      {openModal === "add-member" ? (
        <Modal
          title="Add Member"
          description="Create a new community member record."
          onClose={() => setOpenModal(null)}
        >
          <AddMemberForm />
        </Modal>
      ) : null}

      {openModal === "record-payment" ? (
        <Modal
          title="Record Payment"
          description="Save a member payment for a specific month."
          onClose={() => setOpenModal(null)}
        >
          <RecordPaymentForm
            members={members}
            initialMonth={initialMonth}
            initialYear={initialYear}
          />
        </Modal>
      ) : null}

      {openModal === "update-member" ? (
        <Modal
          title="Update Member"
          description="Edit a member profile without leaving the dashboard."
          onClose={() => setOpenModal(null)}
        >
          <UpdateMemberForm members={members} />
        </Modal>
      ) : null}

      {openModal === "delete-member" ? (
        <Modal
          title="Delete Member"
          description="Remove a member after confirming the action."
          onClose={() => setOpenModal(null)}
        >
          <DeleteMemberForm members={members} />
        </Modal>
      ) : null}

      {openModal === "update-payment" ? (
        <Modal
          title="Update Payment"
          description="Review and edit an existing member payment."
          onClose={() => setOpenModal(null)}
        >
          <UpdatePaymentForm members={members} payments={payments} />
        </Modal>
      ) : null}
    </>
  );
}
