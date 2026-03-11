import {
  getMembers,
  getPayments,
  getRecentPayments,
  getDashboardStats,
} from "@/lib/queries";

import PageShell from "@/components/site/page-shell";
import PageTitle from "@/components/site/page-title";
import SectionCard from "@/components/site/section-card";
import StatCard from "@/components/site/stat-card";
import PaymentTable from "@/components/payment-table";
import RecentPayments from "@/components/recent-payments";
import AlertsPanel from "@/components/alerts-panel";

export default async function DashboardPage() {
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
    <PageShell>
      <PageTitle
        title="Dashboard"
        subtitle="View member payment status and recent updates."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Members" value={stats.totalMembers} />
        <StatCard label="Paid This Month" value={stats.paidThisMonth} />
        <StatCard label="Unpaid" value={stats.unpaidThisMonth} />
        <StatCard
          label="Collected"
          value={`$${Number(stats.totalCollected).toFixed(2)}`}
        />
      </div>

      <div className="mt-6">
        <SectionCard title="Payment Status">
          <PaymentTable members={members} payments={payments} />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Recent Payments">
          <RecentPayments payments={recentPayments} />
        </SectionCard>

        <SectionCard title="Alerts">
          <AlertsPanel unpaidThisMonth={stats.unpaidThisMonth} />
        </SectionCard>
      </div>
    </PageShell>
  );
}