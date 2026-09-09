import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

import type { ExecutiveCommitteeTeam } from "@/features/about/types";

type CommitteeCardListProps = {
  teams: ExecutiveCommitteeTeam[];
};

const CommitteeCardList = ({ teams }: CommitteeCardListProps) => {
  return (
    <div className="flex w-full flex-col gap-12 lg:gap-16">
      {teams.map((team) => {
        const members = team.members;

        return (
          <section key={team.id} aria-labelledby={`committee-team-${team.id}`}>
            <h2
              id={`committee-team-${team.id}`}
              className="text-[18.19px] leading-[22.74px] font-medium tracking-[0px] text-[#249AFF] capitalize"
            >
              {team.name}
            </h2>

            <div className="flex flex-col gap-12 lg:gap-16">
              <div>
                <h3 className="text-[30px] leading-[34px] font-semibold tracking-[0px] text-[#0B1A2B] capitalize">
                  {team.sectionTitle}
                </h3>

                <div className="mt-6 flex flex-wrap gap-[21px]">
                  {members.map((member) => (
                    <article
                      key={member.id}
                      className={`relative w-[298.48px] max-w-full min-w-0 shrink-0 overflow-hidden rounded-[15px] border-[0.75px] border-[#DCE6F2] bg-white p-[6px] shadow-[0_0.75px_3px_rgba(12,12,13,0.05)] transition-transform duration-400 ease-out focus-within:-translate-y-1 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none [@media(max-width:450px)]:w-full ${
                        member.linkedinUrl ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <div className="relative aspect-[381.9684/451.4099] w-full overflow-hidden rounded-[10.23px] bg-[#EFF4FA]">
                        <Image
                          src={member.imageSrc || "/assets/logos/uaic.webp"}
                          alt={`${member.name} profile photo`}
                          fill
                          sizes="(max-width: 450px) calc(100vw - 61.5px), 285px"
                          className="object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-[minmax(0,1fr)_42px] items-start gap-x-[12px] gap-y-2 px-[4.5px] pt-3 pb-[6px]">
                        <div className="col-start-1 min-w-0 break-words">
                          <p className="text-[13.6425px] leading-[17.055px] font-medium tracking-[0px] text-[#249AFF] capitalize">
                            {member.title}
                          </p>
                          <h4 className="text-[22.5px] leading-[25.5px] font-semibold tracking-[0px] text-[#0B1A2B] capitalize">
                            {member.name}
                          </h4>
                        </div>
                        <p className="col-start-1 row-start-2 min-w-0 text-[15px] leading-[26.085px] font-medium tracking-[0px] break-words text-[#6B6F8D]">
                          {member.degree}
                        </p>
                        <span
                          aria-hidden="true"
                          className="col-start-2 row-start-2 flex h-[42px] w-[42px] items-center justify-center rounded-[2.25px] text-[#005EAF]"
                        >
                          <FaLinkedin aria-hidden="true" className="h-full w-full" />
                        </span>
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
