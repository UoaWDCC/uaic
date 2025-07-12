import BulletinCommittee from "@/components/BulletinCommittee";
import ExecutiveCommittee from "@/components/ExecutiveCommittee";
import InvestmentCommittee from "@/components/InvestmentCommittee";

export default function about() {
    return (
        <div className="mt-[10em] md:mt-[12em] min-h-[90vh]">
            <div className="">
                <h1 className="
                    text-darkBlue font-bold p-4 text-[19px]
                    md:pl-10 md:text-[27px]
                ">The Committees</h1>
                <hr className="border-t border-[#CBC6C6] w-full self-center my-6"/>
            </div>
            <ExecutiveCommittee/>
            <BulletinCommittee/>
            <InvestmentCommittee/>
        </div>
    )
}