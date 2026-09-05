import ExecutiveCommitteeAccordion from "@/components/about/ExecutiveCommitteeAccordion";
import CommitteeHeader from "@/components/about/CommitteeHeader";

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
};

type CommitteePageContentProps = {
  executiveCommittee: {
    executiveSubteams: readonly string[];
    teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
  };
};

const CommitteePageContent = ({ executiveCommittee }: CommitteePageContentProps) => {
  const { executiveSubteams, teamProfiles } = executiveCommittee;

  return (
    <div className="w-full bg-[#F4F8FE]">
      <CommitteeHeader />

      <div className="flex w-full flex-col px-6 pt-10 pb-12 lg:px-16 lg:pt-8 lg:pb-20">
        <div id="ExecutiveCommittee" className="scroll-mt-35">
          <ExecutiveCommitteeAccordion
            executiveSubteams={executiveSubteams}
            teamProfiles={teamProfiles}
          />
        </div>
      </div>
    </div>
  );
};

export default CommitteePageContent;
