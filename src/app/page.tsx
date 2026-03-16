import Link from "next/link";
import { getDashboardStats } from "@/lib/queries";

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

export default async function HomePage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const lastUpdated = `${monthLabels[month - 1]} ${now.getDate()}, ${year}`;

  const stats = await getDashboardStats(year, month);

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-5%] top-[10%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/10" />
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
              TCC
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                Turkmen Cultural Center
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Member Dashboard
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Admin Login
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
        <div className="animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300">
            Simple • Clear • Transparent
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Community {" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            View member contribution status, recent updates, and monthly totals
            in one place.
          </p>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated {lastUpdated}
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-2">
          <div className="animate-[fadeInUp_0.9s_ease-out]">
            <Link
              href="/dashboard"
              className="block h-full rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-300/30 backdrop-blur transition hover:-translate-y-1 hover:shadow-slate-400/30 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20"
            >
              <div className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Dashboard Summary</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Live data
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Live
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Members
                    </p>
                    <p className="mt-2 text-lg font-bold">{stats.totalMembers}</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Paid
                    </p>
                    <p className="mt-2 text-lg font-bold">{stats.paidThisMonth}</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Unpaid
                    </p>
                    <p className="mt-2 text-lg font-bold">{stats.unpaidThisMonth}</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      This Month
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      ${Number(stats.monthlyCollected).toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      This Year
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      ${Number(stats.yearlyCollected).toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Total So Far
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      ${Number(stats.totalCollected).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-3">
                  <div className="rounded-xl bg-white p-3 text-center shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Paid Rate
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {stats.totalMembers > 0
                        ? `${Math.round(
                            (stats.paidThisMonth / stats.totalMembers) * 100
                          )}%`
                        : "0%"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Unpaid Rate
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {stats.totalMembers > 0
                        ? `${Math.round(
                            (stats.unpaidThisMonth / stats.totalMembers) * 100
                          )}%`
                        : "0%"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center shadow-sm dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Month
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {monthLabels[month - 1]}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-cyan-600 px-4 py-3 text-center text-sm font-semibold text-white">
                  Open public dashboard
                </div>
              </div>
            </Link>
          </div>

          <div className="animate-[fadeInUp_1s_ease-out]">
            <div className="rounded-[32px] border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                This Month At A Glance
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                See what needs attention right away.
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-white shadow-lg shadow-cyan-500/20">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                    Current Progress
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-bold">
                        {stats.totalMembers > 0
                          ? `${Math.round(
                              (stats.paidThisMonth / stats.totalMembers) * 100
                            )}%`
                          : "0%"}
                      </p>
                      <p className="mt-1 text-sm text-cyan-100">
                        of members are paid for {monthLabels[month - 1]}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/15 px-4 py-3 text-right backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-100">
                        Collected
                      </p>
                      <p className="mt-1 text-xl font-semibold">
                        ${Number(stats.monthlyCollected).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Members Still Open
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                      {stats.unpaidThisMonth}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Members still need a paid record for this month.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Yearly Momentum
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                      ${Number(stats.yearlyCollected).toFixed(2)}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Total collected so far this year across all payments.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Why open the dashboard?
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Search members, filter paid and unpaid status, and review monthly
                    totals in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
        © {year} Turkmen Cultural Center
      </footer>
    </main>
  );
}
