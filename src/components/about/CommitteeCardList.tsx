import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
  linkedinUrl?: string;
};

type CommitteeCardListProps = {
  executiveSubteams: readonly string[];
  teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
};

const TEAM_CATEGORY_TITLES: Record<string, string> = {
  "Secretary & Treasurer": "Operations",
  "Bulletin and Investment Committee Chairperson": "Bulletin and Investment Team",
};

const TEAM_SECTION_TITLES: Record<string, string> = {
  "Bulletin and Investment Committee Chairperson":
    "Bulletin Editor-in-Chief and Investment Committee Chairperson",
  "Secretary & Treasurer": "Secretaries and Treasurers",
  "Social Team": "Social Officers",
  "Marketing Team": "Marketing Officers",
  "Education Team": "Education Officers",
  "Diversity and Inclusion Team": "Diversity and Inclusion Officers",
  "Competitions Team 1": "Competitions Officers",
  "Competitions Team 2": "Competitions Officers",
};

const getRoleOrder = (role: string) => {
  if (/\bsecretar(?:y|ies)\b/i.test(role)) return 0;
  if (/\btreasurers?\b/i.test(role)) return 2;
  if (/\bofficer\b/i.test(role)) return 2;
  if (/\bdirector\b/i.test(role)) return 0;
  return 1;
};

const CommitteeCardList = ({ executiveSubteams, teamProfiles }: CommitteeCardListProps) => {
  return (
    <div className="flex w-full flex-col gap-12 lg:gap-16">
      {executiveSubteams.map((team, teamIndex) => {
        const members = teamProfiles[team] ?? [];
        const roleGroups = new Map<
          string,
          { title: string; members: ExecutiveCommitteeMember[] }
        >();

        const sectionTitle = TEAM_SECTION_TITLES[team];
        const orderedMembers = sectionTitle
          ? [...members].sort((a, b) => getRoleOrder(a.title) - getRoleOrder(b.title))
          : members;

        for (const member of orderedMembers) {
          const title = sectionTitle || member.title.trim() || "Committee Member";
          const key = title.toLowerCase();
          const group = roleGroups.get(key);

          if (group) {
            group.members.push(member);
          } else {
            roleGroups.set(key, { title, members: [member] });
          }
        }

        const sortedRoles = Array.from(roleGroups.values()).sort(
          (a, b) => getRoleOrder(a.title) - getRoleOrder(b.title),
        );

        return (
          <section key={team} aria-labelledby={`committee-team-${teamIndex}`}>
            <h2
              id={`committee-team-${teamIndex}`}
              className="text-[18.19px] leading-[22.74px] font-medium tracking-[0px] text-[#249AFF] capitalize"
            >
              {TEAM_CATEGORY_TITLES[team] || team}
            </h2>

            <div className="flex flex-col gap-12 lg:gap-16">
              {sortedRoles.map(({ title, members: roleMembers }) => (
                <div key={title}>
                  <h3 className="text-[30px] leading-[34px] font-semibold tracking-[0px] text-[#0B1A2B] capitalize">
                    {title}
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-[21px]">
                    {roleMembers.map((member, memberIndex) => (
                      <article
                        key={`${member.name}-${member.title}-${memberIndex}`}
                        className={`relative w-[298.48px] max-w-full min-w-0 shrink-0 overflow-hidden rounded-[15px] border-[0.75px] border-[#DCE6F2] bg-white p-[6px] shadow-[0_0.75px_3px_rgba(12,12,13,0.05)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                          member.linkedinUrl
                            ? "cursor-pointer focus-within:-translate-y-1 hover:-translate-y-1 motion-reduce:transform-none"
                            : ""
                        }`}
                      >
                        <div className="relative aspect-[381.9684/451.4099] w-full overflow-hidden rounded-[10.23px] bg-[#EFF4FA]">
                          <Image
                            src={member.imageSrc || "/assets/logos/uaic.webp"}
                            alt={`${member.name} profile photo`}
                            fill
                            sizes="(max-width: 346px) calc(100vw - 62px), 285px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex items-center gap-[9px] px-[4.5px] pt-3 pb-[6px]">
                          <div className="min-w-0 flex-1 break-words">
                            <p className="text-[13.6425px] leading-[17.055px] font-medium tracking-[0px] text-[#249AFF] capitalize">
                              {member.title}
                            </p>
                            <h4 className="text-[22.5px] leading-[25.5px] font-semibold tracking-[0px] text-[#0B1A2B] capitalize">
                              {member.name}
                            </h4>
                            <p className="text-[15px] leading-[26.085px] font-medium tracking-[0px] text-[#6B6F8D]">
                              {member.degree}
                            </p>
                          </div>
                          {member.linkedinUrl ? (
                            <span
                              aria-hidden="true"
                              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[2.25px] text-[#005EAF]"
                            >
                              <FaLinkedin aria-hidden="true" className="h-full w-full" />
                            </span>
                          ) : (
                            <span
                              aria-hidden="true"
                              className="h-[42px] w-[42px] shrink-0 rounded-[2.25px] border-[0.75px] border-[#DCE6F2]"
                            />
                          )}
                        </div>
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                            className="absolute inset-0 z-10 cursor-pointer rounded-[15px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#249AFF]"
                          />
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <p className="py-8 text-[#6B6F8D]">
                  No members are currently listed for this team.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CommitteeCardList;
