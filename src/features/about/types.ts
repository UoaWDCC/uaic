export type ExecutiveCommitteeMember = {
  id: string;
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
  linkedinUrl?: string;
};

export type ExecutiveCommitteeTeam = {
  id: string;
  name: string;
  sectionTitle: string;
  filterLabel: string;
  members: ExecutiveCommitteeMember[];
};

export type ExecutiveCommitteeData = {
  teams: ExecutiveCommitteeTeam[];
};
