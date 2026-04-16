import Image from "next/image";
import { getProfileCardImage } from "@/features/users/data/getProfileCardImage";

const NathanDalpatanCard = async () => {
  const profileUrl =
    (await getProfileCardImage("69df46a631b7311506e58087")) || "/assets/team/KyleRayner.jpg";
  return (
    <div className="flex w-full max-w-[160px] flex-col items-center text-center sm:max-w-[200px]">
      {/* Profile photo */}
      <div className="relative mb-2 h-24 w-24 sm:h-32 sm:w-32">
        <Image
          src={profileUrl}
          alt="Nathan Dalpatan Image"
          width={128}
          height={128}
          className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
        />
        <Image
          src="/assets/luffy-strawhat.webp"
          alt="Straw Hat Image"
          width={200}
          height={189}
          className="pointer-events-none absolute -top-14 -left-2 h-32 w-32"
        />
      </div>
      {/* Display name */}
      <p className="text-darkBlue sm:text-body text-sm font-bold">Nathan Dalpatan</p>
      {/* Role */}
      <p className="text-darkBlue sm:text-body text-xs">Full-time Overthinker</p>
      {/* Short bio */}
      <p className="sm:text-body mt-1 text-xs">
        Loves to stay active as much as he can. Although he's not good at it, he also enjoys cooking
        and baking
      </p>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 text-xs text-gray-500 italic">
        &ldquo;Yesterday is over. Tomorrow is yet to come. Today is yet unknown.&rdquo;
      </p>
    </div>
  );
};

export default NathanDalpatanCard;
