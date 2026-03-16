import {
  getMembers,
  getPayments,
  getDashboardStats,
} from "@/lib/queries";

import PageShell from "@/components/site/page-shell";
import PageTitle from "@/components/site/page-title";
import SectionCard from "@/components/site/section-card";
import StatCard from "@/components/site/stat-card";
import PaymentTable from "@/components/payment-table";
import AlertsPanel from "@/components/alerts-panel";

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

export default async function DashboardPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const lastUpdated = `${monthLabels[month - 1]} ${now.getDate()}, ${year}`;

  const [stats, members, payments] = await Promise.all([
    getDashboardStats(year, month),
    getMembers(),
    getPayments(year),
  ]);

  const paidMemberIds = new Set(
    payments
      .filter(
        (payment) =>
          payment.year === year &&
          payment.month === month &&
          payment.payment_status === "paid"
      )
      .map((payment) => payment.member_id)
  );

  const unpaidMemberNames = members
    .filter((member) => !paidMemberIds.has(member.id))
    .map((member) => member.full_name);

  return (
    <PageShell>
      <PageTitle
        title="Dashboard"
        subtitle={`View member payment status and recent updates. Last updated ${lastUpdated}.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Members" value={stats.totalMembers} />
        <StatCard label="Paid This Month" value={stats.paidThisMonth} />
        <StatCard label="Unpaid This Month" value={stats.unpaidThisMonth} />
        <StatCard
          label="Collected"
          value={`$${Number(stats.totalCollected).toFixed(2)}`}
        />
      </div>

      <div className="mt-6">
        <SectionCard
          title="Payment Status"
          subtitle="Search by member, filter by current status, and compare month-by-month progress."
        >
          <PaymentTable
            members={members}
            payments={payments}
            currentMonth={month}
          />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Alerts">
          <AlertsPanel
            unpaidThisMonth={stats.unpaidThisMonth}
            unpaidMemberNames={unpaidMemberNames}
          />
        </SectionCard>
      </div>
    </PageShell>
  );
}
