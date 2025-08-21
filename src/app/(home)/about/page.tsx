import BulletinCommittee from "@/components/about/BulletinCommittee";
import ExecutiveCommittee from "@/components/about/ExecutiveCommittee";
import InvestmentCommittee from "@/components/about/InvestmentCommittee";
import BlueGradient from "@/components/BlueGradient";

export default function about() {
  return (
    <div className="mt-[10em] md:mt-[11.5em] min-h-[90vh]">
      <div className="">
        <h1
          className="
                    text-darkBlue font-bold pb-4 px-4 text-[19px]
                    md:pl-10 md:text-[27px]
                "
        >
          The Committees
        </h1>
        <hr className="border-t border-grey-200 w-full self-center my-6" />
      </div>
      <ExecutiveCommittee />
      <BulletinCommittee />
      <InvestmentCommittee/>
      <BlueGradient/>
    </div>
  );
}
