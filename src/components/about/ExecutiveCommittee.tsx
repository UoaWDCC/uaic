"use client";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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

const teamProfiles: Record<
  string,
  { name: string; title: string; degree: string; imageSrc: string }[]
> = {
  "Leadership Team": [
    {
      name: "Danielle Smith",
      title: "Co-President",
      degree: "BSc/BCom - Accounting, Finance & Statistics",
      imageSrc: "/assets/execs/leadership/danielle-smith.webp",
    },
    {
      name: "James Maclean",
      title: "Co-President",
      degree: "LLB/BCom - Finance & Economics",
      imageSrc: "/assets/execs/leadership/james-maclean.webp",
    },
  ],
  "Bulletin and Investment Committee Chairperson": [
    {
      name: "Riley Bogard-Allan",
      title: "Bulletin Editor-in-Chief",
      degree: "BCom/BA - Economics, Maths & History",
      imageSrc: "/assets/execs/bulletin-investment/riley-bogard-allan.webp",
    },
    {
      name: "Rohit Guthpe",
      title: "Investment Committee Chairperson",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/execs/bulletin-investment/rohit-guthpe.webp",
    },
  ],
  "Secretary & Treasurer": [
    {
      name: "Amica Valencia",
      title: "Secretary",
      degree:
        "BCom - International Business & Operations & Supply Chain Management",
      imageSrc: "/assets/execs/secretary-treasurer/amica-valencia.webp",
    },
    {
      name: "Isabella Boswell",
      title: "Secretary",
      degree: "LLB/BCom - Accounting & Commercial Law",
      imageSrc: "/assets/execs/secretary-treasurer/isabella-boswell.webp",
    },
    {
      name: "Tom Maclean",
      title: "Treasurer",
      degree: "BCom/BSci - Finance & Computer Science",
      imageSrc: "/assets/execs/secretary-treasurer/tom-maclean.webp",
    },
  ],
  "Diversity and Inclusion Team": [
    {
      name: "Cassandra Ekanayake",
      title: "D&I Director",
      degree: "BSc/BCom - Finance, Accounting & IT Management",
      imageSrc: "/assets/execs/diversity-inclusion/cassandra-ekanayake.webp",
    },
    {
      name: "Kayleigh Pieters",
      title: "D&I Officer",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/execs/diversity-inclusion/kayleigh-pieters.webp",
    },
    {
      name: "Lisa Shiozawa",
      title: "D&I Officer",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/execs/diversity-inclusion/lisa-shiozawa.webp",
    },
  ],
  "Education Team": [
    {
      name: "Gavin Chi",
      title: "Education Director",
      degree: "BEng/BCom - Software Engineering, Finance & Economics",
      imageSrc: "/assets/execs/education/gavin-chi.webp",
    },
    {
      name: "Abby Sathyendran",
      title: "Education Officer",
      degree: "BCom/BA - Finance, Accounting, Economics & Statistics",
      imageSrc: "/assets/execs/education/abby-sathyendran.webp",
    },
    {
      name: "Reuben Paul",
      title: "Education Officer",
      degree: "BEng(Hons)/BCom - Mechatronics, Finance & Economics",
      imageSrc: "/assets/execs/education/reuben-paul.webp",
    },
    {
      name: "Samuel Foote",
      title: "Education Officer",
      degree: "LLB(Hons)/BCom - Finance",
      imageSrc: "/assets/execs/education/samuel-foote.webp",
    },
  ],
  "Competitions Team 1": [
    {
      name: "Aimee Ng",
      title: "Competitions Director",
      degree: "BCom(Hons) - Finance & Economics",
      imageSrc: "/assets/execs/comps/team1/aimee-ng.webp",
    },
    {
      name: "Andrew Griffiths",
      title: "Competitions Officer",
      degree: "BEng(Hons)/BCom - Finance",
      imageSrc: "/assets/execs/comps/team1/andrew-griffiths.webp",
    },
    {
      name: "Katie Parr",
      title: "Competitions Officer",
      degree: "BCom/BSc - Accounting, Finance & Computer Science",
      imageSrc: "/assets/execs/comps/team1/katie-parr.webp",
    },
  ],
  "Competitions Team 2": [
    {
      name: "Isabella Ho",
      title: "Competitions Director",
      degree: "LLB(Hons)/BCom - Finance & Economics",
      imageSrc: "/assets/execs/comps/team2/isabella-ho.webp",
    },
    {
      name: "Riley Atkinson",
      title: "Competitions Officer",
      degree: "BEng - Computer Systems",
      imageSrc: "/assets/execs/comps/team2/riley-atkinson.webp",
    },
  ],
  "Marketing Team": [
    {
      name: "Isabella Boswell",
      title: "Marketing Director",
      degree: "LLB/BCom - Accounting & Commercial Law",
      imageSrc: "/assets/execs/secretary-treasurer/isabella-boswell.webp",
    },
    {
      name: "Angelina Katseli",
      title: "Marketing Officer",
      degree: "BSc/BCom - Finance, Accounting & IT Management",
      imageSrc: "/assets/execs/marketing/angelina-katseli.webp",
    },
    {
      name: "Joshua Dawson",
      title: "Marketing Officer",
      degree: "BCom - Finance & Economics",
      imageSrc: "/assets/execs/marketing/joshua-dawson.webp",
    },
    {
      name: "Rose Tan",
      title: "Marketing Officer",
      degree: "BA - Psychology & Criminology",
      imageSrc: "/assets/execs/marketing/rose-tan.webp",
    },
  ],
  "Social Team": [
    {
      name: "Matt Powell",
      title: "Social Director",
      degree: "BCom/BSc - Finance, Economics & Statistics",
      imageSrc: "/assets/execs/social/matt-powell.webp",
    },
    {
      name: "Miles Tapsell",
      title: "Social Officer",
      degree: "LLB/BCom - Finance & Accounting",
      imageSrc: "/assets/execs/social/miles-tapsell.webp",
    },
    {
      name: "Sam Gowen",
      title: "Social Officer",
      degree: "BCom - Finance & Marketing",
      imageSrc: "/assets/execs/social/sam-gowen.webp",
    },
    {
      name: "Shiva Nyayapati",
      title: "Social Officer",
      degree: "LLB/BCom - Finance & Economics",
      imageSrc: "/assets/execs/social/shiva-nyayapati.webp",
    },
  ],
};

const ExecutiveCommittee = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openSubteams, setOpenSubteams] = useState<string[]>([]);

  const toggleSubteam = (team: string) => {
    setOpenSubteams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  return (
    <div className="w-full mx-auto p-4 lg:px-10 bg-white rounded-lg shadow-md">
      <div>
        <button
          onClick={() => setIsMainOpen(!isMainOpen)}
          className="w-full flex justify-between items-center text-left text-darkBlue font-medium py-2 hover:cursor-pointer"
        >
          <span className="font-bold md:text-[20px]">Executive Committees</span>
          {isMainOpen ? (
            <IoIosArrowUp size={30} />
          ) : (
            <IoIosArrowDown size={30} />
          )}
        </button>

        {isMainOpen && (
          <div className="text-sm text-darkBlue">
            <p className="mb-4 pl-4">
              The Executive Committee is responsible for running the club,
              including:
            </p>
            <ul className="list-disc list-inside mb-4 pl-6">
              <li>
                Running competitions, educational events, social events and
                club-wide initiatives
              </li>
              <li>Regularly communicating with our members</li>
              <li>Managing the Investment Committee and Bulletin Committee</li>
            </ul>

            {/* Render subteams */}
            {executiveSubteams.map((team) => (
              <div key={team}>
                <button
                  onClick={() => toggleSubteam(team)}
                  className="w-full flex justify-between items-center text-left text-darkBlue font-medium py-2 hover:cursor-pointer"
                >
                  <span className="font-bold">{team}</span>
                  {openSubteams.includes(team) ? (
                    <IoIosArrowUp size={30} />
                  ) : (
                    <IoIosArrowDown size={30} />
                  )}
                </button>

                {/* Show subteam details using ProfileCard.tsx*/}
                {openSubteams.includes(team) && (
                  <div className="pl-4 py-1 text-sm text-darkBlue">
                    {teamProfiles[team] && (
                      <div className="flex flex-wrap gap-4 justify-start">
                        {teamProfiles[team].map((member) => (
                          <div key={member.name} className="">
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

      <hr className="border-t border-grey-200 w-9/10 md:w-full self-center my-6" />
    </div>
  );
};

export default ExecutiveCommittee;
