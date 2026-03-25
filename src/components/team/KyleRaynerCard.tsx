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

export default function KyleRaynerCard() {
  return (
    <div className="flex max-w-[200px] flex-col items-center text-center">
      {/* Profile photo */}
      <Image
        src="/assets/team/KyleRayner.jpg"
        alt="Kyle Rayner Image"
        width={128}
        height={128}
        className="mb-2 h-32 w-32 rounded-full object-cover"
      />
      {/* Display name */}
      <p className="text-darkBlue font-bold">Kyle Rayner</p>
      {/* Role */}
      <p className="text-darkBlue text-sm">Freelance Graphic Artist</p>
      {/* Short bio */}
      <p className="mt-1 text-sm">
        Loves drawing & painting, turning his imagination into reality through art & willpower.
      </p>
      {/* Personal quote */}
      <p className="mt-2 text-sm text-gray-500 italic">
        &ldquo;In brightest day, in blackest night, no evil shall escape my sight.&rdquo;
      </p>
    </div>
  );
}
