"use client";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";

const executiveSubteams = [
  "Leadership Team",
  "Bulletin and Investment Committee Chairperson",
  "Secretary & Treasurer",
  "Diversity and Inclusion Team",
  "Education Team",
  "Competitions Team 1",
  "Competitions Team 2",
  "Marketing Team",
  "Social Team",
];

const teamProfiles: Record<string, { name: string; title: string; degree: string; imageSrc: string }[]> = {
  "Leadership Team": [
    {
      name: "Danielle Smith",
      title: "Co-President",
      degree: "BSc/BCom - Accounting, Finance & Statistics",
      imageSrc: "/assets/danielle-smith.png",
    },
    {
      name: "James Maclean",
      title: "Co-President",
      degree: "LLB/BCom - Finance & Economics",
      imageSrc: "/assets/james-maclean.png",
    },
  ],
  "Bulletin and Investment Committee Chairperson": [
    {
      name: "Riley Bogard-Allan",
      title: "Bulletin Editor-in-Chief",
      degree: "BCom/BA - Economics, Maths & History",
      imageSrc: "/assets/riley-bogard-allan.png",
    },
    {
      name: "Rohit Guthpe",
      title: "Investment Committee Chairperson",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/rohit-guthpe.png",
    },
  ],
};


const ExecutiveCommitteesDropdown = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openSubteams, setOpenSubteams] = useState<string[]>([]);

  const toggleSubteam = (team: string) => {
    setOpenSubteams((prev) =>
      prev.includes(team)
        ? prev.filter((t) => t !== team)
        : [...prev, team]
    );
  };

  return (

    <div className="w-full max-w-md mx-auto p-4 bg-white">

      <div>

        <button onClick={() => setIsMainOpen(!isMainOpen)} className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2">
          <span className="font-bold">Executive Committees</span>
          <img src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`} alt="" className="w-7 h-7  inline-block" />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9]">
            <p className="mb-2 pl-4">The Executive Committee is responsible for running the club, including:</p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>Running competitions, educational events, social events and club-wide initiatives</li>
              <li>Regularly communicating with our members</li>
              <li>Managing the Investment Committee and Bulletin Committee</li>
            </ul>

            {/* Render subteams */}
            {executiveSubteams.map((team) => (
              <div key={team}>
                <button
                  onClick={() => toggleSubteam(team)}
                  className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2"
                >
                  <span className="font-bold">{team}</span>
                  <img
                    src={`/assets/${openSubteams.includes(team) ? "arrow-up" : "arrow-down"}.png`}
                    alt=""
                    className="w-7 h-7 inline-block"
                  />
                </button>
                
                {/* Show subteam details using ProfileCard.tsx*/}
                {openSubteams.includes(team) && (
                  <div className="pl-4 py-1 text-sm text-[#145CA9]">
                    {teamProfiles[team] && (
                      <div className="flex gap-8 flex-wrap">
                        {teamProfiles[team].map((member) => (
                          <ProfileCard
                            key={member.name}
                            name={member.name}
                            title={member.title}
                            degree={member.degree}
                            imageSrc={member.imageSrc}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="border-t border-[#CBC6C6] w-9/10 self-center my-6" />
      
    </div>
  );
};

export default ExecutiveCommitteesDropdown;
