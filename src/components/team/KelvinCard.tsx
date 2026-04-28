import Image from "next/image";
import { getProfileCardImage } from "@/features/users/data/getProfileCardImage";

const KelvinCard = async () => {
  const profileUrl =
    (await getProfileCardImage("69f0707d8372c16f99240669")) || "/assets/team/KyleRayner.jpg";
  return (
    <div className="flex w-full max-w-[160px] flex-col items-center rounded-lg text-center sm:max-w-[200px]">
      {/* Profile photo */}

      <div className="relative mb-2 h-24 w-24 sm:h-32 sm:w-32">
        <Image
          src={profileUrl}
          alt="Kelvin Mensah Image"
          width={128}
          height={128}
          className="mb-2 h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
        />

        <Image
          src="/assets/cap_shield.png"
          alt="Captain America Shield Image"
          width={128}
          height={128}
          className="absolute top-55 left-15"
        />
      </div>

      {/* Display name */}
      <p className="text-darkBlue sm:text-body text-sm font-bold">Kelvin Mensah</p>
      {/* Role */}
      <p className="text-darkBlue sm:text-body text-xs">Developer</p>
      {/* Short bio */}
      <p className="sm:text-body mt-1 text-xs">
        ...love editing, coding and subway. Always up for a challenge.
      </p>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 text-xs text-gray-500 italic">&ldquo;Lock in!&rdquo;</p>
    </div>
  );
};

export default KelvinCard;
