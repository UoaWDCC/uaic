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
          <span className="font-bold">Investment Committees</span>
          <img src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`} alt="" className="w-7 h-7  inline-block" />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9]">
            <p className="mb-2 pl-4">The Investment Committee is responsible for managing the club's fund, including:</p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>Running competitions, educational events, social events and club-wide initiatives</li>
              <li>Regularly communicating with our members</li>
              <li>Managing the Investment Committee and Bulletin Committee</li>
            </ul>

            
          </div>
        )}
      </div>

      <hr className="border-t border-[#CBC6C6] w-9/10 self-center my-6" />
      
    </div>
  );
};

export default ExecutiveCommitteesDropdown;