import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import AdminSidebar from "@/components/admin/admin-sidebar";
import DashboardStats from "@/components/admin/dashboard-stats";
import MemberManagementTable from "@/components/admin/member-management-table";
import RecentPaymentsCard from "@/components/admin/recent-payments-card";
import AlertsCard from "@/components/admin/alerts-card";
import PaymentCalendarGrid from "@/components/admin/payment-calendar-grid";
import MemberSearch from "@/components/admin/member-search";
import AddMemberForm from "@/components/admin/add-member-form";
import RecordPaymentForm from "@/components/admin/record-payment-form";
import UpdatePaymentForm from "@/components/admin/update-payment-form";

import {
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

  const [stats, members, payments, recentPayments] = await Promise.all([
    getDashboardStats(year, month),
    getMembers(),
    getPayments(year),
    getRecentPayments(5),
  ]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <AdminSidebar />

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
                <button className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white">
                  Export Report
                </button>
              </div>
            </header>

            <DashboardStats stats={stats} />

              <MemberSearch members={members} payments={payments} />

              <div id="add-member-form">
                <AddMemberForm />
              </div>

              <div id="record-payment-form">
                <RecordPaymentForm
                  members={members}
                  initialMonth={month}
                  initialYear={year}
                />
              </div>

              <div id="update-payment-form">
                <UpdatePaymentForm members={members} payments={payments} />
              </div>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <MemberManagementTable members={members} />

              <div className="space-y-6">
                <RecentPaymentsCard payments={recentPayments} />
                <AlertsCard unpaidThisMonth={stats.unpaidThisMonth} />
              </div>
            </section>

            <PaymentCalendarGrid members={members} payments={payments} />
          </div>
        </main>
      </div>
    </div>
  );
}
