import { ReactNode } from "react";
import SiteHeader from "./site-header";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-5%] top-[10%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/10" />
      </div>

      <SiteHeader />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </section>
    </main>
  );
}