import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";
import MembershipDashboard, { type MemberProfile } from "@/components/MembershipDashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "member",
    where: { email: { equals: session.user.email } },
    limit: 1,
  });

  // payload-types.ts is stale relative to src/collections/Member.ts, so the
  // generated `Member` type doesn't reflect the fields this collection actually has.
  const member = (docs[0] as unknown as MemberProfile) ?? null;

  return <MembershipDashboard user={session.user} member={member} />;
}
