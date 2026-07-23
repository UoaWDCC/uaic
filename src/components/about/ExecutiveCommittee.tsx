import { getExecutiveCommittee } from "@/features/about/data/getExecutiveCommittee";
import ExecutiveCommitteeAccordion from "./ExecutiveCommitteeAccordion";

const ExecutiveCommittee = async () => {
  const { executiveSubteams, teamProfiles } = await getExecutiveCommittee();

  return (
    <div id="ExecutiveCommittee" className="scroll-mt-35">
      <ExecutiveCommitteeAccordion
        executiveSubteams={executiveSubteams}
        teamProfiles={teamProfiles}
      />
    </div>
  );
};

export default ExecutiveCommittee;
