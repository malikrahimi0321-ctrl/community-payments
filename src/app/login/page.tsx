"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PageShell from "@/components/site/page-shell";
import SectionCard from "@/components/site/section-card";
import PageTitle from "@/components/site/page-title";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <PageTitle title="Admin Login" subtitle="Sign in to manage records." />

        <SectionCard>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-medium text-white hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </SectionCard>
      </div>
    </PageShell>
  );
}