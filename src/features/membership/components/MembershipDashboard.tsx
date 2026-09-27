"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "@/lib/auth-client";
import { MemberProfile, SessionUser } from "../types";
import PersonalDetailsCard from "./PersonalDetailsCard";
import MembershipCard from "./MembershipCard";
import UpcomingEventsCard from "./UpcomingEventsCard";

interface MembershipDashboardProps {
  user: SessionUser;
  member: MemberProfile | null;
}

const MembershipDashboard = ({ user, member }: MembershipDashboardProps) => {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="border-blue-900 text-sm font-bold tracking-wide text-blue-500 uppercase">
          Membership Dashboard
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="text-primary mt-1 text-xl font-extrabold md:text-2xl">
            Welcome Back, {member?.firstName || "Member"}
          </div>
          {member?.hasPaid && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#E7F7EE] px-3 py-2 text-[2vw] font-semibold text-[#1B7A43] md:text-xs">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1B7A43]" />
              Active member
            </div>
          )}
        </div>
        <div className="mt-2 max-w-2xl text-sm text-slate-500">
          Manage your details, track your event RSVPs, and tell us what kind of investing content
          you want more of.
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PersonalDetailsCard user={user} member={member} onSaved={() => router.refresh()} />
          <MembershipCard member={member} />
          <UpcomingEventsCard />
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-8 inline-flex items-center gap-2 font-medium text-red-600 hover:cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiLogOut size={16} />
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default MembershipDashboard;
