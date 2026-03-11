export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}