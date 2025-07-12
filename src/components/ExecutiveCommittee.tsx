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
  "Secretary & Treasurer": [
    {
      name: "Amica Valencia",
      title: "Secretary",
      degree: "BCom - International Business & Operations & Supply Chain Management",
      imageSrc: "/assets/amica-valencia.png",
    },
    {
      name: "Isabella Boswell",
      title: "Secretary",
      degree: "LLB/BCom - Accounting & Commercial Law",
      imageSrc: "/assets/isabella-boswell.png",
    },
    {
      name: "Tom Maclean",
      title: "Treasurer",
      degree: "BCom/BSci - Finance & Computer Science",
      imageSrc: "/assets/tom-maclean.png",
    },
  ],
  "Diversity and Inclusion Team": [
    {
      name: "Cassandra Ekanayake",
      title: "D&I Director",
      degree: "BSc/BCom - Finance, Accounting & IT Management",
      imageSrc: "/assets/cassandra-ekanayake.png",
    },
    {
      name: "Kayleigh Pieters",
      title: "D&I Officer",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/kayleigh-pieters.png",
    },
    {
      name: "Lisa Shiozawa",
      title: "D&I Officer",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/lisa-shiozawa.png",
    },
  ],
  "Education Team": [
    {
      name: "Gavin Chi",
      title: "Education Director",
      degree: "BEng/BCom - Software Engineering, Finance & Economics",
      imageSrc: "/assets/gavin-chi.png",
    },
    {
      name: "Abby Sathyendran",
      title: "Education Officer",
      degree: "BCom/BA - Finance, Accounting, Economics & Statistics",
      imageSrc: "/assets/abby-sathyendran.png",
    },
    {
      name: "Reuben Paul",
      title: "Education Officer",
      degree: "BEng(Hons)/BCom - Mechatronics, Finance & Economics",
      imageSrc: "/assets/reuben-paul.png",
    },
    {
      name: "Samuel Foote",
      title: "Education Officer",
      degree: "LLB(Hons)/BCom - Finance",
      imageSrc: "/assets/samuel-foote.png",
    },
  ],
  "Competitions Team 1": [
    {
      name: "Aimee Ng",
      title: "Competitions Director",
      degree: "BCom(Hons) - Finance & Economics",
      imageSrc: "/assets/aimee-ng.png",
    },
    {
      name: "Andrew Griffiths",
      title: "Competitions Officer",
      degree: "BEng(Hons)/BCom - Finance",
      imageSrc: "/assets/andrew-griffiths.png",
    },
    {
      name: "Katie Parr",
      title: "Competitions Officer",
      degree: "BCom/BSc - Accounting, Finance & Computer Science",
      imageSrc: "/assets/katie-parr.png",
    },
  ],
  "Competitions Team 2": [
    {
      name: "Isabella Ho",
      title: "Competitions Director",
      degree: "LLB(Hons)/BCom - Finance & Economics",
      imageSrc: "/assets/isabella-ho.png",
    },
    {
      name: "Riley Atkinson",
      title: "Competitions Officer",
      degree: "BEng - Computer Systems",
      imageSrc: "/assets/riley-atkinson.png",
    },
  ],
  "Marketing Team": [
    {
      name: "Isabella Boswell",
      title: "Marketing Director",
      degree: "LLB/BCom - Accounting & Commercial Law",
      imageSrc: "/assets/isabella-boswell.png",
    },
    {
      name: "Angelina Katseli",
      title: "Marketing Officer",
      degree: "BSc/BCom - Finance, Accounting & IT Management",
      imageSrc: "/assets/angelina-katseli.png",
    },
    {
      name: "Joshua Dawson",
      title: "Marketing Officer",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/joshua-dawson.png",
    },
    {
      name: "Rose Tan",
      title: "Marketing Officer",
      degree: "BA - Psychology & Criminology",
      imageSrc: "/assets/rose-tan.png",
    },
  ],
  "Social Team": [
    {
      name: "Matt Powell",
      title: "Social Director",
      degree: "BCom/BSc - Finance, Economics & Statistics",
      imageSrc: "/assets/matt-powell.png",
    },
    {
      name: "Miles Tapsell",
      title: "Social Officer",
      degree: "LLB/BCom - Finance & Accounting",
      imageSrc: "/assets/miles-tapsell.png",
    },
    {
      name: "Sam Gowen",
      title: "Social Officer",
      degree: "BCom - Finance & Marketing",
      imageSrc: "/assets/sam-gowen.png",
    },
    {
      name: "Shiva Nyayapati",
      title: "Social Officer",
      degree: "LLB/BCom - Finance & Economics",
      imageSrc: "/assets/shiva-nyayapati.png",
    },
  ],
};

const ExecutiveCommittee = () => {
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
    <div className="w-full mx-auto p-4 lg:px-10 bg-white rounded-lg shadow-md">
      <div>
        <button
          onClick={() => setIsMainOpen(!isMainOpen)}
          className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2"
        >
          <span className="font-bold md:text-[20px]">Executive Committees</span>
          <img
            src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`}
            alt=""
            className="w-7 h-7 inline-block"
          />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9]">
            <p className="mb-4 pl-4">The Executive Committee is responsible for running the club, including:</p>
            <ul className="list-disc list-inside mb-4 pl-6">
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
                      <div className="flex flex-wrap gap-4 justify-start">
                        {teamProfiles[team].map((member) => (
                          <div
                            key={member.name}
                            className=""
                          >
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
        )}
      </div>

      <hr className="border-t border-[#CBC6C6] w-9/10 self-center my-6" />
    </div>
  );
};

export default ExecutiveCommittee;
