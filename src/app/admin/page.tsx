import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import AdminSidebar from "@/components/admin/admin-sidebar";
import DashboardStats from "@/components/admin/dashboard-stats";
import MemberManagementTable from "@/components/admin/member-management-table";
import RecentPaymentsCard from "@/components/admin/recent-payments-card";
import AlertsCard from "@/components/admin/alerts-card";
import ExportReportButton from "@/components/admin/export-report-button";
import MemberSearch from "@/components/admin/member-search";

import {
  getAllPayments,
  getMembers,
  getPayments,
  getRecentPayments,
  getDashboardStats,
} from "@/lib/queries";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [stats, members, payments, allPayments, recentPayments] = await Promise.all([
    getDashboardStats(year, month),
    getMembers(),
    getPayments(year),
    getAllPayments(),
    getRecentPayments(5),
  ]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <AdminSidebar
          members={members}
          payments={payments}
          initialMonth={month}
          initialYear={year}
        />

        <main className="p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <header className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage members and track community payments
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Main Page
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Public Dashboard
                </Link>

                <ExportReportButton members={members} payments={allPayments} />
              </div>
            </header>

            <DashboardStats stats={stats} />

            <MemberSearch members={members} payments={payments} />

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <MemberManagementTable members={members} />

              <div className="space-y-6">
                <RecentPaymentsCard payments={recentPayments} />
                <AlertsCard unpaidThisMonth={stats.unpaidThisMonth} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
