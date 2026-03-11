type AlertsCardProps = {
  unpaidThisMonth: number;
};

export default function AlertsCard({ unpaidThisMonth }: AlertsCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Alerts</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-2xl bg-red-50 p-4 text-red-700">
          {unpaidThisMonth} members have not paid this month.
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-amber-700">
          Review overdue accounts and follow up if needed.
        </div>
      </div>
    </div>
  );
}