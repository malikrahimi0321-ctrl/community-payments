import Link from "next/link";

export default function SiteHeader() {
  return (
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
              Member Contributions
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <Link
            href="/members"
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Members
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}