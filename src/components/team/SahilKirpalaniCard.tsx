/*
 * HOW TO ADD YOUR TEAM CARD
 * --------------------------
 * 1. Create a file named <YourName>Card.tsx in this folder (e.g. KyleRaynerCard.tsx)
 * 2. Export a default React component — no props needed, hardcode your own data
 * 3. Add your card to src/app/(home)/team/page.tsx:
 *    - Import it at the top (see the commented-out example)
 *    - Drop <YourNameCard /> inside the grid div (see the commented-out example)
 *
 * MINIMUM FIELDS TO INCLUDE
 * - Name
 * - Role / position
 * - Short bio (1–2 sentences)
 * - Photo — place your image in public/assets/team/ and use next/image
 * - Personal quote (optional, but fun!)
 *
 * TIPS
 * - Reference src/components/about/ProfileCard.tsx for a simple starting point
 * - Use Tailwind classes for styling — no new CSS files needed
 */

import Image from "next/image";

const SahilKirpalaniCard = () => {
  return (
    <div className="flex w-full max-w-[180px] flex-col items-center text-center sm:max-w-[220px]">
      {/* Profile photo */}
      <Image
        src="/assets/team/sahilkirpalani.jpg"
        alt="Sahil Kirpalani Image"
        width={128}
        height={128}
        className="mb-2 h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
      />
      {/* Display name */}
      <p className="text-darkBlue sm:text-body text-sm font-bold">Sahil Kirpalani</p>
      {/* Role */}
      <p className="text-darkBlue sm:text-body text-xs">Engineering Science Student</p>
      {/* Short bio */}
      {/* Clapboard bio */}
      {/* clapboard */}
      <div className="relative mt-4 w-full">
        <img
          src="/assets/team/clapboard.png"
          alt="clapboard"
          className="max-h-52 w-full object-cover"
        />

        {/* Bio text */}
        <div className="absolute bottom-6 left-1/2 w-[70%] -translate-x-1/2">
          <p className="text-center font-mono text-xs text-white drop-shadow-lg">
            Love movies, video editing, Instagram reels, and I&apos;m getting addicted to
            basketball.
          </p>
        </div>
      </div>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 text-xs text-gray-500 italic">
        &ldquo; You're the 6 to my 7.&rdquo;
      </p>
    </div>
  );
};

export default SahilKirpalaniCard;
