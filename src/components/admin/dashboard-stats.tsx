type Stats = {
  totalMembers: number;
  paidThisMonth: number;
  unpaidThisMonth: number;
  totalCollected: number;
};

export default function DashboardStats({ stats }: { stats: Stats }) {
  const cards = [
    { label: "Total Members", value: stats.totalMembers },
    { label: "Paid This Month", value: stats.paidThisMonth },
    { label: "Unpaid Members", value: stats.unpaidThisMonth },
    { label: "Total Collected", value: `$${stats.totalCollected}` },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">{card.label}</div>
          <div className="mt-3 text-3xl font-bold">{card.value}</div>
        </div>
      ))}
    </section>
  );
}