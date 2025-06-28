"use client";
import React, { useState } from "react";

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

const ExecutiveCommitteesDropdown = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openSubteam, setOpenSubteam] = useState<string | null>(null);
  const toggleSubteam = (team: string) => setOpenSubteam((prev) => (prev === team ? null : team));

  return (

    <div className="w-full max-w-md mx-auto p-4 bg-white">

      <div>

        <button onClick={() => setIsMainOpen(!isMainOpen)} className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2">
          <span className="font-bold">Executive Committees</span>
          <img src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`} alt="" className="w-7 h-7  inline-block" />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9]"> {/* Removed pl-4 here */}
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
                    src={`/assets/${openSubteam === team ? "arrow-up" : "arrow-down"}.png`}
                    alt=""
                    className="w-7 h-7 inline-block"
                  />
                </button>
                {/* Show subteam details if the team is open */}
                {openSubteam === team && (
                  <div className="pl-4 py-1 text-sm text-[#145CA9]">
                    <p>Meow this is meow {team} meoww mewo.</p>
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
