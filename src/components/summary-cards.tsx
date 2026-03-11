type SummaryCardsProps = {
  totalMembers: number;
  paidThisMonth: number;
  unpaidThisMonth: number;
  totalCollected: number;
};

export default function SummaryCards({
  totalMembers,
  paidThisMonth,
  unpaidThisMonth,
  totalCollected,
}: SummaryCardsProps) {
  const cards = [
    { label: "Total Members", value: totalMembers },
    { label: "Paid This Month", value: paidThisMonth },
    { label: "Unpaid This Month", value: unpaidThisMonth },
    { label: "Total Collected", value: `$${totalCollected}` },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
        </div>
      ))}
    </section>
  );
}