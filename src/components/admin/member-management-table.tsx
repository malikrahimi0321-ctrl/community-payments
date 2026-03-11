import Link from "next/link";

type MemberRow = {
  id: string;
  full_name: string;
  status: string;
};

export default function MemberManagementTable({
  members,
}: {
  members: MemberRow[];
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Member Management</h2>
          <p className="mt-1 text-sm text-slate-500">
            View households, balances, and payment status at a glance.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-3 pr-4 font-medium">First Name</th>
              <th className="pb-3 pr-4 font-medium">Last Name</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-slate-100 last:border-0">
                <td className="py-4 pr-4">
                  <div className="font-semibold">{member.full_name}</div>
                </td>
                
                <td className="py-4 pr-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {member.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <Link
                    href={`/members`}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}