type AlertsPanelProps = {
  unpaidThisMonth: number;
};

export default function AlertsPanel({
  unpaidThisMonth,
}: AlertsPanelProps) {
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Alerts</h2>

      <div className="mt-3 space-y-2 text-sm">
        <p className="text-red-600">
          {unpaidThisMonth} members have not paid this month.
        </p>

        <p className="text-amber-600">
          Review overdue members and follow up.
        </p>
      </div>
    </section>
  );
}