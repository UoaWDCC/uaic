"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProfileCard from "./ProfileCard";

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
};

interface ExecutiveCommitteeAccordionProps {
  executiveSubteams: readonly string[];
  teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
}

const ExecutiveCommitteeAccordion = ({
  executiveSubteams,
  teamProfiles,
}: ExecutiveCommitteeAccordionProps) => {
  const [openSubteams, setOpenSubteams] = useState<string[]>([]);

  const toggleSubteam = (team: string) => {
    setOpenSubteams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team],
    );
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-4 lg:px-10">
      <div>
        <span className="text-header text-darkBlue font-bold">Executive Committees</span>

        <div className="text-darkBlue mt-[1em] text-sm">
          <p className="mb-4 pl-4">
            The Executive Committee is responsible for running the club, including:
          </p>
          <ul className="mb-4 list-inside list-disc pl-6">
            <li>
              Running competitions, educational events, social events and club-wide initiatives
            </li>
            <li>Regularly communicating with our members</li>
            <li>Managing the Investment Committee and Bulletin Committee</li>
          </ul>

          {executiveSubteams.map((team) => (
            <div key={team} className="mt-[0.5rem]">
              <button
                onClick={() => toggleSubteam(team)}
                className="text-darkBlue flex w-full items-center justify-between py-2 text-left font-medium hover:cursor-pointer"
              >
                <span className="text-header w-[22rem] font-bold md:w-[30rem]">{team}</span>
                {openSubteams.includes(team) ? (
                  <IoIosArrowUp size={30} />
                ) : (
                  <IoIosArrowDown size={30} />
                )}
              </button>

              {openSubteams.includes(team) && (
                <div className="text-darkBlue py-1 pl-4 text-sm">
                  {teamProfiles[team] && (
                    <div className="flex flex-wrap justify-start gap-4">
                      {teamProfiles[team].map((member) => (
                        <div key={member.name} className="text-body">
                          <ProfileCard
                            name={member.name}
                            title={member.title}
                            degree={member.degree}
                            imageSrc={member.imageSrc}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="border-grey-200 my-6 w-9/10 self-center border-t md:w-full" />
    </div>
  );
};

export default ExecutiveCommitteeAccordion;
