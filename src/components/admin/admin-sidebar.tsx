import Link from "next/link";
import AdminQuickActions from "./admin-quick-actions";
import LogoutButton from "./logout-button";

type Member = {
  id: string;
  full_name: string;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  notes?: string | null;
};

type Payment = {
  id: string;
  member_id: string;
  month: number;
  year: number;
  amount_due: number;
  amount_paid: number;
  payment_status: "paid" | "partial" | "unpaid";
  payment_date: string | null;
  note?: string | null;
};

type AdminSidebarProps = {
  members: Member[];
  payments: Payment[];
  initialMonth: number;
  initialYear: number;
};

export default function AdminSidebar({
  members,
  payments,
  initialMonth,
  initialYear,
}: AdminSidebarProps) {
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

          <AdminQuickActions
            members={members}
            payments={payments}
            initialMonth={initialMonth}
            initialYear={initialYear}
          />

          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </nav>
    </aside>
  );
}
