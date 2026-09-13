import React from "react";
import CommitteePageContent from "@/features/about/components/CommitteePageContent";
import { getExecutiveCommittee } from "@/features/about/data/getExecutiveCommittee";

// Read current CMS content on every page request.
export const dynamic = "force-dynamic";

const Page = async () => {
  const executiveCommittee = await getExecutiveCommittee();

  return (
    <div className="flex w-full flex-col items-center">
      <CommitteePageContent executiveCommittee={executiveCommittee} />
    </div>
  );
};

export default Page;
