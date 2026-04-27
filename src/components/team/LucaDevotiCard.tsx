import Image from "next/image";
import { getProfileCardImage } from "@/features/users/data/getProfileCardImage";

const LucaDevotiCard = async () => {
  const profileUrl =
    (await getProfileCardImage("69ef29bc6d93198589dc9596")) || "/assets/team/KyleRayner.jpg";
  const profileEyesUrl = (await getProfileCardImage("69ef33756d93198589dc99cf")) || null;
  return (
    <div className="flex w-full max-w-[160px] flex-col items-center text-center sm:max-w-[200px]">
      {/* Profile photo */}
      <div className="relative mb-2 h-24 w-24 sm:h-32 sm:w-32">
        <Image
          src={profileUrl}
          alt="Luca Devoti Image"
          width={128}
          height={128}
          className="mb-2 h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
        />
        {profileEyesUrl && (
          <Image
            src={profileEyesUrl}
            alt="Luca Devoti Laser Eyes"
            width={128}
            height={128}
            className="absolute top-[25%] left-[8%] h-[60%] w-[60%] -rotate-7 object-contain opacity-85"
          />
        )}
      </div>
      {/* Display name */}
      <p className="font-luca text-darkBlue text-[20px]">Luca Devoti</p>
      {/* Role */}
      <p className="text-darkBlue sm:text-body text-xs">Rookie Developer</p>
      {/* Short bio */}
      <p className="sm:text-body mt-1 text-xs">
        Loves music, games, and learning. He's on a mission to hit 150wpm on MonkeyType, and if
        studying didn't consume him, he'd be learning music production.
      </p>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 text-xs text-gray-500 italic">
        &ldquo;We all have two lives, the second begins when we realise we only have one.&rdquo;
      </p>
    </div>
  );
};

export default LucaDevotiCard;
