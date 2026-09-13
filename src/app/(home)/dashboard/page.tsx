import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";
import MembershipDashboard, {
  type MemberProfile,
} from "@/features/membership/components/MembershipDashboard";

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

  // payload.find() isn't generic over the collection slug, so its return type
  // doesn't narrow to the generated `Member` type - hence the cast.
  const member = (docs[0] as unknown as MemberProfile) ?? null;

  return <MembershipDashboard user={session.user} member={member} />;
}
