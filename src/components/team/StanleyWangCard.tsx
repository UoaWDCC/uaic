import Image from "next/image";
import { FaFlask } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { LiaDrumSolid } from "react-icons/lia";
import { FaGamepad } from "react-icons/fa";
import { FaTableTennis } from "react-icons/fa";
import { getProfileCardImage } from "@/features/users/data/getProfileCardImage";

const StanleyWangCard = async () => {
  const profileUrl =
    (await getProfileCardImage("69ed6a953bb8a28e22c24fd0")) || "/assets/team/KyleRayner.jpg";
  return (
    <a
      className="nameContainer flex w-full max-w-[160px] flex-col items-center rounded-2xl bg-[url(/assets/team/StanleyWangBackground.jpg)] bg-contain bg-cover bg-center bg-no-repeat pt-3 text-center shadow-[0_0_15px_rgba(36,235,242,1)] outline-blue-400 outline-solid sm:max-w-[200px]"
      href="https://www.youtube.com/watch?v=Aq5WXmQQooo"
    >
      {/* Profile photo */}
      <div className="h-30.5 w-31 rounded-full bg-cyan-300 ps-0.5 pt-0.5 drop-shadow-[0_0_10px_rgba(3,232,252,1)] sm:h-38 sm:w-38">
        <div className="bg-grey-100 h-29.5 w-30 rounded-full ps-0.5 pt-0.5 drop-shadow-[0_0_10px_rgba(255,235,255,1)] sm:h-37 sm:w-37 sm:ps-0.5 sm:pt-0.5">
          <div className="h-28.5 w-29 rounded-full bg-blue-400 ps-1 pt-0.5 sm:h-36 sm:w-36 sm:ps-0.5 sm:pt-0.5">
            <div className="h-27 w-27 rounded-full bg-black ps-1 pt-0.5 sm:h-35 sm:w-35 sm:ps-1.5 sm:pt-1">
              <Image
                src={profileUrl}
                alt=""
                width={128}
                height={128}
                className="mb-2 h-25 w-25 rounded-full object-cover pt-1 sm:h-32 sm:w-32"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Display name */}
      <p className="pt-4 font-serif text-xl font-bold text-white">Stanley Wang</p>
      {/* Role */}
      <p className="sm:text-body text-xs text-blue-900">Developer</p>
      {/* Short bio */}
      <div className="profile-grids grid grid-flow-col pt-3 text-indigo-900 text-shadow-[0_0_10px_rgba(255,255,255,1)]">
        <div className="row-span-1 ps-4 pe-5">
          <div className="ps-0.5">
            <FaFlask className="size-5 fill-pink-500 drop-shadow-[0_0_5px_rgba(249,168,212,1)]" />
          </div>

          <p className="pt-1 text-xs">Flask</p>
        </div>

        <div className="row-span-1 pe-4">
          <FaDatabase className="size-5 fill-cyan-600 drop-shadow-[0_0_5px_rgba(36,235,242,1)]" />
          <p className="pt-1 text-xs">SQL</p>
        </div>

        <div className="row-span-1">
          <div className="ps-2">
            <FaBootstrap className="size-6 fill-green-800 drop-shadow-[0_0_5px_rgba(36,242,87,1)]" />
          </div>

          <p className="text-center text-xs">Boostrap</p>
        </div>
      </div>

      <div className="profile-grids grid grid-flow-col ps-0.5 pt-2 text-indigo-900">
        <div className="drums row-span-1 ps-2 pe-3">
          <div className="ps-1">
            <LiaDrumSolid className="size-6" />
          </div>

          <p className="text-xs">Drums</p>
        </div>

        <div className="row-span-1 ps-0.5 pe-3.5">
          <div className="ps-1">
            <FaGamepad className="size-6" />
          </div>

          <p className="text-xs">Games</p>
        </div>

        <div className="row-span-1 pt-1">
          <div className="ps-1">
            <FaTableTennis className="size-5" />
          </div>

          <p className="text-xs">Sports</p>
        </div>
      </div>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 ps-1 pe-1 pb-3 text-xs text-gray-500 italic">
        &ldquo;55 burgers 55 fries&rdquo;
      </p>
    </a>
  );
};

export default StanleyWangCard;
