import BulletinCommittee from "@/components/about/BulletinCommittee";
import ExecutiveCommittee from "@/components/about/ExecutiveCommittee";
import InvestmentCommittee from "@/components/about/InvestmentCommittee";
import BlueGradient from "@/components/BlueGradient";

export default function about() {
  return (
    <div className="mt-[10em] min-h-[90vh] md:mt-[11.5em]">
      <div className="">
        <h1 className="text-darkBlue text-header px-4 pb-4 font-bold md:pl-10">The Committees</h1>
        <hr className="border-grey-200 my-6 w-full self-center border-t" />
      </div>
      <ExecutiveCommittee />
      <BulletinCommittee />
      <InvestmentCommittee />
      <BlueGradient />
    </div>
  );
}
