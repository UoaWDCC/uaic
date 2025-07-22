"use client";
import React, { useState } from "react";
import Image from "next/image";

const BulletinCommittee = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  type Member = {
  name: string;
  role: string;
};

const members: Member[] = [
    { name: "Riley Bogard-Allan", role: "Editor-in-Chief" },
    { name: "Isabella Ho", role: "Sub-Editor" },
    { name: "Skip Gee", role: "Senior Writer" },
    { name: "Devika Modak", role: "Senior Writer" },
    { name: "Daniel Gunho-Song", role: "Writer" },
    { name: "Yasmin Coombe", role: "Writer" },
    { name: "Andy Tran", role: "Writer" },
    { name: "Meghana Gaddam", role: "Writer" },
    { name: "Connor Petrie", role: "Writer" },
    { name: "Yao Ming Lee", role: "Writer" },
    { name: "Alice Hout", role: "Writer" },
    { name: "Waejen Kwan", role: "Writer" },
    { name: "Bella Crawford", role: "Writer" },
    { name: "Sohum Karl", role: "Writer" },
    { name: "Oliver Turnbull", role: "Writer" },
    { name: "Lisa Shiozawa", role: "Writer" },
    { name: "Hunter Sari", role: "Writer" },
    { name: "Manav Treekam", role: "Writer" },
    { name: "Annabelle Larsen", role: "Writer" }
];


  return (
    <div className="w-full mx-auto p-4 lg:px-10 bg-white rounded-lg shadow-md">
      <div>
        <button
          onClick={() => {
            setIsMainOpen(!isMainOpen);
            // closes inner dropdowns
            setIsMembersOpen(false);
          }}
          className="w-full flex justify-between items-center text-left text-darkBlue font-medium py-2"
        >
          <span className="font-bold md:text-[20px]">Bulletin Committees</span>
          <img
            src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`}
            alt=""
            className="w-7 h-7  inline-block"
          />
        </button>

        {isMainOpen && (
          <div className="text-sm text-darkBlue flex flex-col items-center">
            {/* changed nathans sizing design slightly, as the edges of the description and image were getting cut off at smaller widths below 500px */}
            <div className="w-9/10 flex flex-col items-center">
              <p className="mb-4">
                The Bulletin Committee is responsible for publishing the club's
                bulletin, including:
              </p>

              <ul className="list-disc list-inside mb-4 text-left">
                <li>
                  Writing articles on a range of financial and economic topics
                </li>
                <li>Offering advice on each other's articles</li>
                <li>
                  Contributing opinions towards the club's weekly magazine
                </li>
              </ul>

              <div className="w-full h-[300px] max-w-[500px] bg-lightBlue flex items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src="/assets/bulletin-committee.png"
                  alt="bulletin-committee"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="items-center text-center mt-4">
              <p className="p-2">
                <strong>Back Row: </strong>Daniel Gunho-Song, Andy Tran, Sohum
                Karl, Meghana Gaddam
              </p>
              <p className="p-2">
                <strong>Third Row: </strong>Yasmin Coombe, Skip Gee, Connor
                Petrie, Oliver Turnbull
              </p>
              <p className="p-2">
                <strong>Second Row: </strong>Yao Ming Lee, Hunter Sari, Alice
                Hout
              </p>
              <p className="p-2">
                <strong>Front Row: </strong>Devika Modak, Annabelle Larsen,
                Isabella Ho, Riley Bogard-Allan, Lisa Shiozawa, Manav Treekam
              </p>
              <p className="p-2">
                <strong>Absent: </strong>Bella Crawford, Waejen Kwan
              </p>
            </div>

            <button
              onClick={() => setIsMembersOpen(!isMembersOpen)}
              className="w-full flex justify-between items-center text-left text-darkBlue font-medium py-2"
            >
              <span className="font-bold ">Team Members and Roles</span>
              <img
                src={`/assets/${isMembersOpen ? "arrow-up" : "arrow-down"}.png`}
                alt=""
                className="w-7 h-7  inline-block"
              />
            </button>

            {isMembersOpen && (
                <div>
                    <section className="w-full max-w-6xl mx-auto px-4 py-8">
  <h2 className="text-2xl font-semibold mb-6">Team Members & Roles</h2>
  <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-4 gap-y-4 gap-x-6">
    {members.map((member, index) => (
      <div key={index}>
        <p className="text-base font-bold">{member.name}</p>
        <p className="text-base">{member.role}</p>
      </div>
    ))}
  </div>
</section>


                </div>
            )}
          </div>
        )}
      </div>

      <hr className="border-t border-grey-200 w-9/10 md:w-full self-center my-6" />
    </div>
  );
};

export default BulletinCommittee;
