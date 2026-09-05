import React from "react";
import CommitteePageContent from "@/components/about/CommitteePageContent";
import { getExecutiveCommittee } from "@/features/about/data/getExecutiveCommittee";

const page = async () => {
  const executiveCommittee = await getExecutiveCommittee();

  return (
    <div className="flex w-full flex-col items-center">
      <CommitteePageContent executiveCommittee={executiveCommittee} />
    </div>
  );
};

export default page;
