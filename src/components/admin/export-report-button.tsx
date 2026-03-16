"use client";

import { useMemo, useState } from "react";

type Member = {
  id: string;
  full_name: string;
};

type Payment = {
  id: string;
  member_id: string;
  month: number;
  year: number;
  amount_paid: number;
};

type ExportMode = "full" | "individual";

type ExportReportButtonProps = {
  members: Member[];
  payments: Payment[];
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

function escapeCsv(value: string | number | null | undefined) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
}

export default function ExportReportButton({
  members,
  payments,
}: ExportReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ExportMode>("full");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedMemberId) ?? null,
    [members, selectedMemberId]
  );

  function buildRow(member: Member) {
    const memberPayments = payments.filter(
      (payment) => payment.member_id === member.id
    );

    const monthlyTotals = Array.from({ length: 12 }, (_, index) =>
      memberPayments
        .filter((payment) => payment.month === index + 1)
        .reduce((sum, payment) => sum + Number(payment.amount_paid ?? 0), 0)
    );

    const total = monthlyTotals.reduce((sum, value) => sum + value, 0);

    return {
      full_name: member.full_name,
      Jan: monthlyTotals[0].toFixed(2),
      Feb: monthlyTotals[1].toFixed(2),
      Mar: monthlyTotals[2].toFixed(2),
      Apr: monthlyTotals[3].toFixed(2),
      May: monthlyTotals[4].toFixed(2),
      Jun: monthlyTotals[5].toFixed(2),
      Jul: monthlyTotals[6].toFixed(2),
      Aug: monthlyTotals[7].toFixed(2),
      Sep: monthlyTotals[8].toFixed(2),
      Oct: monthlyTotals[9].toFixed(2),
      Nov: monthlyTotals[10].toFixed(2),
      Dec: monthlyTotals[11].toFixed(2),
      Total: total.toFixed(2),
    };
  }

  function downloadCsv(rows: ReturnType<typeof buildRow>[], filename: string) {
    const headers = ["full_name", ...monthLabels, "Total"];
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((header) => escapeCsv(row[header as keyof typeof row])).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleExport() {
    const stamp = new Date().toISOString().slice(0, 10);

    if (mode === "individual") {
      if (!selectedMember) {
        return;
      }

      const safeName = selectedMember.full_name.toLowerCase().replace(/\s+/g, "-");
      downloadCsv(
        [buildRow(selectedMember)],
        `${safeName}-payment-report-${stamp}.csv`
      );
      setIsOpen(false);
      return;
    }

    downloadCsv(
      members.map(buildRow),
      `community-full-payment-report-${stamp}.csv`
    );
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white"
        onClick={() => setIsOpen(true)}
      >
        Export Report
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close export dialog"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Export Report
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose whether to export all members or one member only.
                </p>
              </div>

              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    mode === "full"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                  onClick={() => setMode("full")}
                >
                  Full Report
                </button>

                <button
                  type="button"
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    mode === "individual"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                  onClick={() => setMode("individual")}
                >
                  Individual Report
                </button>
              </div>

              {mode === "individual" ? (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Select Member
                  </label>
                  <select
                    value={selectedMemberId}
                    onChange={(event) => setSelectedMemberId(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm outline-none"
                  >
                    <option value="">Choose a member</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
                disabled={mode === "individual" && !selectedMemberId}
                onClick={handleExport}
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
