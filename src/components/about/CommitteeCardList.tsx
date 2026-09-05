"use client";

import { useState } from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
};

type CommitteeCardListProps = {
  executiveSubteams: readonly string[];
  teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
  expandAll?: boolean;
};

const CommitteeCardList = ({
  executiveSubteams,
  teamProfiles,
  expandAll = false,
}: CommitteeCardListProps) => {
  const [openSubteams, setOpenSubteams] = useState<string[]>([]);

  const toggleSubteam = (team: string) => {
    setOpenSubteams((currentTeams) =>
      currentTeams.includes(team)
        ? currentTeams.filter((openTeam) => openTeam !== team)
        : [...currentTeams, team],
    );
  };

  return (
    <div className="flex w-full flex-col gap-5 lg:gap-6">
      {executiveSubteams.map((team, teamIndex) => {
        const members = teamProfiles[team] ?? [];
        const isOpen = expandAll || openSubteams.includes(team);
        const panelId = `committee-team-${teamIndex}`;

        return (
          <section
            key={team}
            className="overflow-hidden rounded-[32px] border border-[#DCE6F2] bg-white shadow-[0_1px_4px_rgba(12,12,13,0.05)]"
          >
            <button
              type="button"
              onClick={() => toggleSubteam(team)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-5 px-5 py-2.5 text-left lg:min-h-[64px] lg:py-3"
            >
              <span className="text-[18px] leading-tight font-light text-[#6B7A90] lg:text-[18px]">
                {team}
              </span>
              <GoArrowUpRight
                aria-hidden="true"
                className={`h-7 w-7 shrink-0 text-[#0067B9] transition-transform duration-200 lg:h-8 lg:w-8 ${isOpen ? "rotate-45" : "rotate-0"}`}
              />
            </button>

            <div
              id={panelId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-4 px-3 pb-3 sm:grid-cols-2 lg:px-5 lg:pb-5 xl:grid-cols-3">
                  {members.length > 0 ? (
                    members.map((member, memberIndex) => (
                      <article
                        key={`${member.name}-${member.title}-${memberIndex}`}
                        className="min-w-0 rounded-[20px] border border-[#DCE6F2] bg-white p-2 shadow-[0_1px_4px_rgba(12,12,13,0.05)]"
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-[#EFF4FA]">
                          <Image
                            src={member.imageSrc || "/assets/logos/uaic.webp"}
                            alt={`${member.name} profile photo`}
                            fill
                            sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, calc(100vw - 64px)"
                            className="object-cover"
                          />
                        </div>

                        <div className="px-3 pt-5 pb-4">
                          <p className="text-[16px] leading-[20px] font-medium text-[#249AFF] lg:text-[18px]">
                            {member.title}
                          </p>
                          <h2 className="mt-1 text-[24px] leading-[28px] font-semibold text-[#0B1A2B] lg:text-[28px] lg:leading-[32px]">
                            {member.name}
                          </h2>
                          <p className="mt-2 text-[16px] leading-[22px] text-[#6B6F8D] lg:text-[18px]">
                            {member.degree}
                          </p>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="col-span-full py-8 text-center text-[#6B6F8D]">
                      No members are currently listed for this team.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CommitteeCardList;
