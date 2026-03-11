import Link from "next/link";
import LogoutButton from "./logout-button";

export default function AdminSidebar() {
  const items = [
    { label: "Dashboard", href: "/admin" },
    { label: "Members", href: "/members" },
    { label: "Payments", href: "/dashboard" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="text-xl font-bold">Community Admin</div>
        <div className="mt-1 text-sm text-slate-500">Payments & members</div>
      </div>

      <nav className="p-4">
        <div className="space-y-1">
          {items.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                i === 0
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-slate-50 p-4">
          <div className="text-sm font-semibold">Quick Actions</div>

          <div className="mt-3 space-y-2">
            
              <a
                href="#add-member-form"
                className="block w-full rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white"
              >
                Add Member
              </a>
            
              <a
                href="#record-payment-form"
                className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-sm font-medium text-slate-700"
              >
                Record Payment
              </a>

              <a
                href="#update-payment-form"
                className="block w-full rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm font-medium text-amber-700"
              >
                Update Payment
              </a>
          </div>

          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </nav>
    </aside>
  );
}