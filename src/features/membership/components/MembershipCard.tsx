import { MemberProfile } from "../types";

const formatMemberSince = (paymentDate?: string | null) => {
  if (!paymentDate) return "—";
  return new Date(paymentDate).toLocaleDateString("en-NZ", { month: "long", year: "numeric" });
};

/* Membership runs until the end of the calendar year it was paid in */
const formatValidUntil = (paymentDate?: string | null) => {
  if (!paymentDate) return "";
  return `Valid until end of ${new Date(paymentDate).getFullYear()}`;
};

interface MembershipCardProps {
  member: MemberProfile | null;
}

const MembershipCard = ({ member }: MembershipCardProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <p className="text-ink text-xl font-bold">Membership</p>
      </div>

      <div className="from-primary-light to-primary flex justify-between rounded-2xl bg-linear-to-r p-5 text-white">
        <div className="flex-col">
          <div className="text-xl font-bold">
            {member?.hasPaid ? "General Member" : "Membership Pending"}
            {!member && <p className="mt-1 text-sm text-blue-100">No membership on file yet</p>}
          </div>
          <div className="text-xs">
            {member?.hasPaid ? formatValidUntil(member.paymentDate) : ""}
          </div>
        </div>
        <div className="my-auto">
          {/* 
          <Link href="/">
            {" "}
            <button className="rounded-4xl bg-[#FFFFFF2E] px-3 py-2 text-xs font-semibold">
              Renews auto.
            </button>
          </Link>
          */}
        </div>
      </div>
      {member?.hasPaid && (
        <>
          <div className="w-full flex-col pt-7">
            <hr className="border-border border-t" />
            <div className="pt-5 text-sm font-medium tracking-wide text-slate-500 uppercase">
              Member Since
            </div>
            <p className="text-ink mt-1 text-sm">{formatMemberSince(member?.paymentDate)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MembershipCard;
