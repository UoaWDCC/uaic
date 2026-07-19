import { getExecutiveCommittee } from "@/features/about/data/getExecutiveCommittee";
import ExecutiveCommitteeAccordion from "./ExecutiveCommitteeAccordion";

const ExecutiveCommittee = async () => {
  const { executiveSubteams, teamProfiles } = await getExecutiveCommittee();

  return (
    <ExecutiveCommitteeAccordion
      executiveSubteams={executiveSubteams}
      teamProfiles={teamProfiles}
    />
  );
};

export default ExecutiveCommittee;
