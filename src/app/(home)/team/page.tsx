import BlueGradient from "@/components/BlueGradient";
import KyleRaynerCard from "@/components/team/KyleRaynerCard";
import MaryMarikitCard from "@/components/team/MaryMarikitCard";
import KelvinCard from "@/components/team/KelvinCard";
import StanleyWangCard from "@/components/team/StanleyWangCard";
import NathanDalpatanCard from "@/components/team/NathanDalpatanCard";
import AerynCard from "@/components/team/AerynCard";

// Import your card here, e.g. AliceCard from "@/components/team/AliceCard";

const TeamPage = () => {
  return (
    <div className="mt-[10em] md:mt-[11.5em]">
      <div>
        <h1 className="text-darkBlue text-header px-4 pb-4 font-bold md:pl-10">Meet the Team</h1>
        <hr className="border-grey-200 my-6 w-full self-center border-t" />
      </div>
      <div className="mx-auto w-full rounded-lg bg-white p-4 lg:px-10">
        <div className="flex flex-wrap justify-center gap-8 py-8">
          {/* Example card */}
          <KyleRaynerCard />
          <MaryMarikitCard />
          <KelvinCard />
          <NathanDalpatanCard />
          <AerynCard />
          {/* Add your card component here, e.g.: <AliceCard /> */}
          <StanleyWangCard />
        </div>
      </div>
      <BlueGradient />
    </div>
  );
};

export default TeamPage;
