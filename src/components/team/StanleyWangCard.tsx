import Image from "next/image";

const myCard = () => {
  return (
    <a
      className="nameContainer flex w-full max-w-[160px] flex-col items-center rounded-2xl bg-[url(/assets/team/background.jpg)] bg-contain bg-cover bg-center bg-no-repeat pt-3 text-center outline-blue-400 outline-solid sm:max-w-[200px]"
      /*href="https://www.youtube.com/watch?v=Aq5WXmQQooo"*/
    >
      {/* Profile photo */}
      <div className="profileFrame ps-1.5 pt-1">
        <Image
          src="/assets/team/profilePic.jpg"
          alt=""
          width={128}
          height={128}
          className="mb-2 h-24 w-24 rounded-full object-cover pt-1 sm:h-32 sm:w-32"
        />
      </div>
      {/* Display name */}
      <p className="modifiedText pt-4 text-xl font-bold">Stanley Wang</p>
      {/* Role */}
      <p className="sm:text-body text-xs text-blue-900">Developer</p>
      {/* Short bio */}
      <p className="ps-0.5 pe-0.5 pt-3 text-sm">
        Fullstack experience with Flask, SQLAlchemy and Bootstrap. Enjoys sports, drums and video
        games.
      </p>
      {/* Personal quote */}
      <p className="sm:text-body mt-2 ps-1 pe-1 pb-3 text-xs text-gray-500 italic">
        &ldquo;55 burgers 55 fries&rdquo;
      </p>
    </a>
  );
};

export default myCard;
