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
    <div className="min-h-screen bg-slate-100 px-4 pt-12 pb-8 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl sm:mt-6 lg:mt-10">
        <div className="text-sm font-bold tracking-wide text-blue-500 uppercase">
          Membership Dashboard
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="text-ink mt-1 text-xl font-extrabold md:text-2xl">
            Welcome Back, {member?.firstName || user.name?.split(" ")[0] || "Member"}
          </div>
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
