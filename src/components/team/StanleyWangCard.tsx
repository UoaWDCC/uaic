import Image from "next/image";

const myCard = () => {
  return (
    <a
      className="nameContainer flex w-full max-w-[160px] flex-col items-center rounded-2xl bg-[url(/assets/team/background.jpg)] bg-contain bg-cover bg-center bg-no-repeat pt-3 text-center outline-blue-400 outline-solid sm:max-w-[200px]"
      href="https://www.youtube.com/watch?v=Aq5WXmQQooo"
    >
      {/* Profile photo */}
      <div className="outer-frame1 ps-1 pt-1">
        <div className="outer-frame2 ps-0.5 pt-0.5">
          <div className="outer-frame3">
            <div className="profileFrame ps-1.5 pt-1">
              <Image
                src="/assets/team/profilePic.jpg"
                alt=""
                width={128}
                height={128}
                className="mb-2 h-24 w-24 rounded-full object-cover pt-1 sm:h-32 sm:w-32"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Display name */}
      <p className="modifiedText pt-4 font-serif text-xl font-bold">Stanley Wang</p>
      {/* Role */}
      <p className="sm:text-body text-xs text-blue-900">Developer</p>
      {/* Short bio */}
      <div className="profile-grids grid grid-flow-col pt-3">
        <div className="row-span-1 ps-4 pe-5">
          <i className="fa-solid fa-flask flask"></i>
          <p className="text-xs">Flask</p>
        </div>

        <div className="row-span-1 pe-4">
          <i class="fa-solid fa-database database"></i>
          <p className="text-xs">SQL</p>
        </div>

        <div className="row-span-1">
          <i class="fa-brands fa-bootstrap bootstrap"></i>
          <p className="text-xs">Boostrap</p>
        </div>
      </div>

      <div className="profile-grids grid grid-flow-col">
        <div className="drums row-span-1 ps-1 pe-3">
          <i class="fa-solid fa-drum"></i>
          <p className="text-xs">Drums</p>
        </div>

        <div className="row-span-1 pe-4 pt-1.5">
          <i class="fa-solid fa-gamepad games"></i>
          <p className="text-xs">Games</p>
        </div>

        <div className="row-span-1 pt-1.5">
          <i class="fa-solid fa-table-tennis-paddle-ball sports"></i>
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

export default myCard;
