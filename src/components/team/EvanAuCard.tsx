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

const EvanAuCard = () => {
  return (
    <div className="flex w-full max-w-[160px] flex-col items-center text-center sm:max-w-[200px]">
      {/* Profile photo */}
      <Image
        src="/assets/team/EvanImage.png"
        alt="Evan Au Image"
        width={128}
        height={128}
        className="mb-2 h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
      />
      {/* Display name */}
      <p className="text-darkBlue sm:text-body text-sm font-bold">Evan Au</p>
      {/* Role */}
      <p className="text-darkBlue sm:text-body text-xs">Sleepy Guy (TL)</p>
      {/* Short bio */}
      <p className="sm:text-body mt-1 text-xs">
        meow meow meowm oewm oewmewo meow meow meow meow meow meow meow meow meow meow meow meow
        meow meow meow meow meow
      </p>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 text-xs text-gray-500 italic">&ldquo;Snore mimimimi&rdquo;</p>
    </div>
  );
};

export default EvanAuCard;
