import Link from "next/link";
import { getDashboardStats, getRecentPayments } from "@/lib/queries";

type RecentPayment = {
  id: string;
  amount_paid: number;
  payment_status: string;
  payment_date: string | null;
  members?:
    | { full_name?: string | null }[]
    | { full_name?: string | null }
    | null;
};

export default async function HomePage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [stats, recentPayments] = await Promise.all([
    getDashboardStats(year, month),
    getRecentPayments(3),
  ]);

  const typedRecentPayments = recentPayments as RecentPayment[];

  const realPayments = typedRecentPayments.filter(
    (payment) =>
      Number(payment.amount_paid) > 0 &&
      payment.payment_status !== "unpaid" &&
      payment.payment_date
  );

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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <div className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300">
              Simple • Clear • Transparent
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Community {" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              View member contribution status, recent updates, and monthly totals
              in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-600 hover:to-blue-700"
              >
                Open Dashboard
              </Link>

              <Link
                href="/members"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                View Members
              </Link>
            </div>

            <div className="mt-6 grid max-w-3xl grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Members
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-2xl font-bold">{stats.paidThisMonth}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Members Paid This Month
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-2xl font-bold">{stats.unpaidThisMonth}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Members Unpaid This Month
                </p>
              </div>
            </div>
          </div>

          <div className="animate-[fadeInUp_1s_ease-out]">
            <div className="relative mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-300/30 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
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

                <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Recent Payments</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Latest updates
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {realPayments.length === 0 ? (
                      <div className="rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        No recent payments found.
                      </div>
                    ) : (
                      realPayments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                payment.payment_status === "paid"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {Array.isArray(payment.members)
                                  ? payment.members[0]?.full_name ?? "Unknown Member"
                                  : payment.members?.full_name ?? "Unknown Member"}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                ${Number(payment.amount_paid).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400">
                            {payment.payment_date}
                          </span>
                        </div>
                      ))
                    )}
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
                      {now.toLocaleString("default", { month: "short" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
        © {new Date().getFullYear()} Turkmen Cultural Center
      </footer>
    </main>
  );
}