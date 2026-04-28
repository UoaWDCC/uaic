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
import { getProfileCardImage } from "@/features/users/data/getProfileCardImage";

const MaryMarikitCard = async () => {
  const profileURL =
    (await getProfileCardImage("69f00f279477a05a6fdc961f")) || "/assets/team/KyleRayner.jpg";
  const stickerURL = await getProfileCardImage("69f00f589477a05a6fdc966f");
  return (
    <div className="flex w-full max-w-[160px] flex-col items-center text-center sm:max-w-[200px]">
      {/* Profile photo */}

      <div className="relative flex w-full max-w-[160px] flex-col items-center text-center sm:max-w-[200px]">
        <Image
          src={profileURL}
          alt="Mary Marikit Image"
          width={128}
          height={128}
          className="mb-2 h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
        />

        <Image
          src={stickerURL}
          alt="Jax Sticker Image"
          width={64}
          height={64}
          className="absolute right-2 bottom-0 h-17 w-12 object-cover sm:h-21 sm:w-16"
        />
      </div>

      {/* Display name */}
      <p className="text-darkBlue sm:text-body text-sm font-bold">Mary Marikit</p>
      {/* Role */}
      <p className="text-darkBlue sm:text-body text-xs">Developer</p>
      {/* Short bio */}
      <p className="sm:text-body mt-1 text-xs">
        Loves going on hikes and taking pictures, filling her SD cards with lush trees, nice views,
        and her beloved friends.
      </p>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 text-xs text-gray-500 italic"> &ldquo;papoi&rdquo; </p>
    </div>
  );
};

export default MaryMarikitCard;
