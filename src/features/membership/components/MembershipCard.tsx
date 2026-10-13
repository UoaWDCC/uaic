import { MemberProfile } from "../types";

/*
 * Formatted in NZ time explicitly - this renders on the server (UTC on Fly) and again in the
 * browser, so without a fixed timeZone a payment near midnight could show a different
 * month/year on each and cause a hydration mismatch.
 */
const NZ_TIME_ZONE = "Pacific/Auckland";

const formatMemberSince = (paymentDate?: string | null) => {
  if (!paymentDate) return "—";
  return new Date(paymentDate).toLocaleDateString("en-NZ", {
    month: "long",
    year: "numeric",
    timeZone: NZ_TIME_ZONE,
  });
};

/* Membership runs until the end of the calendar year it was paid in */
const formatValidUntil = (paymentDate?: string | null) => {
  if (!paymentDate) return "";
  const year = new Date(paymentDate).toLocaleDateString("en-NZ", {
    year: "numeric",
    timeZone: NZ_TIME_ZONE,
  });
  return `Valid until end of ${year}`;
};

interface MembershipCardProps {
  member: MemberProfile | null;
}

const MembershipCard = ({ member }: MembershipCardProps) => {
  /* A signed-in but unpaid user still has a (login-only) doc, so check hasPaid rather than !member */
  const hasPaid = !!member?.hasPaid;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <p className="text-ink text-xl font-bold">Membership</p>
      </div>

      <div className="from-primary-light to-primary rounded-2xl bg-linear-to-r p-5 text-white">
        <div className="text-xl font-bold">
          {hasPaid ? "General Member" : "Membership Pending"}
          {!hasPaid && <p className="mt-1 text-sm text-blue-100">No membership on file yet</p>}
        </div>
        {hasPaid && <div className="text-xs">{formatValidUntil(member?.paymentDate)}</div>}
      </div>
      {hasPaid && (
        <div className="w-full flex-col pt-7">
          <hr className="border-border border-t" />
          <div className="pt-5 text-sm font-medium tracking-wide text-slate-500 uppercase">
            Member Since
          </div>
          <p className="text-ink mt-1 text-sm">{formatMemberSince(member?.paymentDate)}</p>
        </div>
      )}
    </div>
  );
};

export default MembershipCard;
