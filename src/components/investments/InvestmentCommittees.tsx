import Image from "next/image";
import { getICGroupPhoto } from "@/features/users/data/getICGroupPhoto";

export default async function InvestmentCommittee() {
  let imageUrl: string | null = null;

  try {
    imageUrl = await getICGroupPhoto();
  } catch (error) {
    console.error("Failed to load IC group photo:", error);
  }

  return (
    <div className="w-full mx-auto p-4 lg:px-80 bg-background rounded-lg">
      <div>
        <h1 className="text-title font-bold text-darkBlue mb-8 pb-2">
          Investment Committees
        </h1>

        <div className="text-body text-darkBlue">
          <p className="mb-4 font-bold">
            The Investment Committee is a team of student analysts who actively
            manage the Club's Investment Fund.
          </p>

          <p className="mb-4">
            We were formed in 2009 and now have approximately $38,000 in assets
            under management, making us one of New Zealand's oldest and largest
            student-managed funds.
          </p>

          <p className="mb-4">
            Investing is for everyone - our analysts study a range of degrees
            beyond just finance, and we are bound by our collective interest in
            the financial markets.
          </p>

          <p className="mb-10">
            Education is one of our core values - all our analysts are supported
            in their roles through regular workshops and ongoing mentorship,
            assisting our team in making the best decisions when directly
            interacting with the market.
          </p>

          <p className="mb-4 font-bold">
            We practise value investing and ensure all our investments align with
            this philosophy by following a three-step process:
          </p>

          <ol className="list-decimal list-inside mb-10">
            <li>
              A qualitative pitch is delivered to the Committee, which is
              subsequently voted on
            </li>
            <li>
              Valuations are performed to assess the fair value of the investment
            </li>
            <li>
              Investments are pitched back to the wider Club, requiring a majority
              vote before being added to the Fund
            </li>
          </ol>

          <p className="mb-4 font-bold">
            The Investment Committee is responsible for managing the club's fund,
            including:
          </p>

          <ul className="list-disc list-inside mb-10">
            <li>
              Ensuring all investments are in line with the fund's value investing
              thesis
            </li>
            <li>
              Regularly pitching and analysing potential stock investments
            </li>
            <li>
              Voting to decide whether an investment passes to the next stage of
              approval
            </li>
          </ul>

          <div className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-lg mb-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="investment-committee"
                width={500}
                height={300}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-grey-100">
                <span>Image not available</span>
              </div>
            )}
          </div>

          <div className="text-center text-body">
            <p className="mb-2">
              <strong>Back row: </strong>Max Wilson, Sam Gowen, Caden Van De Laak
            </p>
            <p className="mb-2">
              <strong>Middle row: </strong>Sophia Walker, Caleb Manson, Matt
              Powell, Tom Maclean, Shivam Shanker
            </p>
            <p className="mb-2">
              <strong>Front row: </strong>Amelia Cave, Abbey Patten, Rohit Guthpe,
              Aimee Ng, Cullen Tran, Lilly Crawford
            </p>
            <p className="mb-2">
              <strong>Absent: </strong>Isabella Boswell, Andrew Griffiths
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
