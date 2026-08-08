"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Member = {
  name: string;
  role: string;
};

interface BulletinCommitteeMembersProps {
  members: Member[];
}

const BulletinCommitteeMembers = ({ members }: BulletinCommitteeMembersProps) => {
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  return (
    <>
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
    </>
  );
};

export default BulletinCommitteeMembers;
