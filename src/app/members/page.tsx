import { getMembers } from "@/lib/queries";
import PageShell from "@/components/site/page-shell";
import PageTitle from "@/components/site/page-title";
import SectionCard from "@/components/site/section-card";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <PageShell>
      <PageTitle
        title="Members"
        subtitle="Browse the member directory."
      />

      <SectionCard>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-slate-100">
                  <td className="py-4 pr-4 font-medium">{member.full_name}</td>
                  <td className="py-4 pr-4">{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  );
}