import React from "react";
import Image from "next/image";
import { getBulletinCommittee } from "@/features/about/data/getBulletinCommittee";
import BulletinCommitteeMembers from "./BulletinCommitteeMembers";

const BulletinCommittee = async () => {
  const { members } = await getBulletinCommittee();

  return (
    <div
      id="BulletinComittee"
      className="mx-auto w-full scroll-mt-35 rounded-lg bg-white p-4 lg:px-10"
    >
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

          <BulletinCommitteeMembers members={members} />
        </div>
      </div>

      <hr className="border-grey-200 my-6 w-9/10 self-center border-t md:w-full" />
    </div>
  );
};

export default BulletinCommittee;
