"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const BulletinCommittee = () => {
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
    { name: "Annabelle Larsen", role: "Writer" },
  ];

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-4 lg:px-10">
      <div>
        <span className="text-header text-darkBlue font-bold">Bulletin Committee</span>
        <div className="text-darkBlue mt-[1em] flex flex-col items-center text-sm">
          {/* changed nathans sizing design slightly, as the edges of the description and image were getting cut off at smaller widths below 500px */}
          <div className="text-body flex w-9/10 flex-col items-center">
            <p className="mb-4">
              The Bulletin Committee is responsible for publishing the club's bulletin, including:
            </p>

            <ul className="mb-4 list-inside list-disc text-left">
              <li>Writing articles on a range of financial and economic topics</li>
              <li>Offering advice on each other's articles</li>
              <li>Contributing opinions towards the club's weekly magazine</li>
            </ul>

            <div className="bg-lightBlue flex h-[300px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg">
              <Image
                src="/assets/execs/bulletin-committee.webp"
                alt="bulletin-committee"
                width={500}
                height={300}
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-body mt-4 items-center text-center">
            <p className="p-2">
              <strong>Back Row: </strong>Daniel Gunho-Song, Andy Tran, Sohum Karl, Meghana Gaddam
            </p>
            <p className="p-2">
              <strong>Third Row: </strong>Yasmin Coombe, Skip Gee, Connor Petrie, Oliver Turnbull
            </p>
            <p className="p-2">
              <strong>Second Row: </strong>Yao Ming Lee, Hunter Sari, Alice Hout
            </p>
            <p className="p-2">
              <strong>Front Row: </strong>Devika Modak, Annabelle Larsen, Isabella Ho, Riley
              Bogard-Allan, Lisa Shiozawa, Manav Treekam
            </p>
            <p className="p-2">
              <strong>Absent: </strong>Bella Crawford, Waejen Kwan
            </p>
          </div>

          <button
            onClick={() => setIsMembersOpen(!isMembersOpen)}
            className="text-darkBlue flex w-full items-center justify-between py-2 text-left font-medium hover:cursor-pointer"
          >
            <span className="text-body font-bold">Team Members and Roles</span>
            {isMembersOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
          </button>

          {isMembersOpen && (
            <div>
              <section className="mx-auto w-full max-w-6xl px-4 py-8">
                <h2 className="text-body mb-6 text-2xl font-semibold">Team Members & Roles</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4 lg:grid-cols-4">
                  {members.map((member, index) => (
                    <div key={index}>
                      <p className="text-body text-base font-bold">{member.name}</p>
                      <p className="text-body text-base">{member.role}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      <hr className="border-grey-200 my-6 w-9/10 self-center border-t md:w-full" />
    </div>
  );
};

export default BulletinCommittee;
