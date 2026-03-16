type AlertsPanelProps = {
  unpaidThisMonth: number;
  unpaidMemberNames: string[];
};

export default function AlertsPanel({
  unpaidThisMonth,
  unpaidMemberNames,
}: AlertsPanelProps) {
  const hasAlerts = unpaidThisMonth > 0;

  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Alerts</h2>

      <div className="mt-3 space-y-2 text-sm">
        {hasAlerts ? (
          <>
            <p className="text-red-600">
              {unpaidThisMonth} members have not paid this month.
            </p>

            <p className="text-amber-600">
              Review overdue members and follow up.
            </p>

            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="font-medium text-slate-700">Members needing payment</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {unpaidMemberNames.map((name) => (
                  <li
                    key={name}
                    className="rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <p className="text-emerald-600">
              Everyone marked for this month is up to date.
            </p>

            <p className="text-slate-500">
              No action is needed right now.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
