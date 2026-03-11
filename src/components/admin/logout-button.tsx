"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  );
}