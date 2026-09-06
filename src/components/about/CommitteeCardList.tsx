import Image from "next/image";

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
};

type CommitteeCardListProps = {
  executiveSubteams: readonly string[];
  teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
};

const getRoleOrder = (role: string) => {
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

        for (const member of members) {
          const title = member.title.trim() || "Committee Member";
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
              {team}
            </h2>

            <div className="flex flex-col gap-12 lg:gap-16">
              {sortedRoles.map(({ title, members: roleMembers }) => (
                <div key={title}>
                  <h3 className="text-[30px] leading-[34px] font-semibold tracking-[0px] text-[#0B1A2B] capitalize">
                    {title}
                  </h3>

                  <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:gap-7 xl:grid-cols-3">
                    {roleMembers.map((member, memberIndex) => (
                      <article
                        key={`${member.name}-${member.title}-${memberIndex}`}
                        className="min-w-0 overflow-hidden rounded-[20px] border border-[#DCE6F2] bg-white p-2 shadow-[0_1px_4px_rgba(12,12,13,0.05)]"
                      >
                        <div className="relative aspect-[381.9684/451.4099] w-full overflow-hidden rounded-[13.64px] bg-[#EFF4FA]">
                          <Image
                            src={member.imageSrc || "/assets/logos/uaic.webp"}
                            alt={`${member.name} profile photo`}
                            fill
                            sizes="(min-width: 1280px) calc((100vw - 238px) / 3), (min-width: 1024px) calc((100vw - 192px) / 2), (min-width: 640px) calc((100vw - 108px) / 2), calc(100vw - 66px)"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex items-center gap-3 px-1.5 pt-4 pb-2">
                          <div className="min-w-0 flex-1 break-words">
                            <p className="text-[18.19px] leading-[22.74px] font-medium tracking-[0px] text-[#249AFF] capitalize">
                              {member.title}
                            </p>
                            <h4 className="text-[30px] leading-[34px] font-semibold tracking-[0px] text-[#0B1A2B] capitalize">
                              {member.name}
                            </h4>
                            <p className="text-[20px] leading-[34.78px] font-medium tracking-[0px] text-[#6B6F8D]">
                              {member.degree}
                            </p>
                          </div>
                          <span
                            aria-hidden="true"
                            className="h-14 w-14 shrink-0 rounded-[3px] border border-[#DCE6F2]"
                          />
                        </div>
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
