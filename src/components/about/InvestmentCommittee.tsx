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
    <div className="mx-auto w-full rounded-lg bg-white p-4 lg:px-10">
      <div>
        <span className="text-header text-darkBlue font-bold">Investment Committee</span>

        <div className="text-darkBlue flex flex-col items-center text-sm">
          <div className="text-body flex w-9/10 flex-col items-center">
            <p className="my-4">
              The Investment Committee is responsible for managing the club's fund, including:
            </p>

            <ul className="mb-4 list-inside list-disc text-left">
              <li>Ensuring all investments are in line with the fund's value investing thesis</li>
              <li>Regularly pitching and analysing potential stock investments</li>
              <li>Voting to decide whether an investment passes to the next stage of approval</li>
            </ul>

            <div className="flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="investment-committee"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <span>Image not available</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-body mt-4 items-center text-center">
            <p className="p-2">
              <strong>Back Row: </strong>Max Wilson, Sam Gowen, Caden Van De Laak
            </p>
            <p className="p-2">
              <strong>Middle Row: </strong>Sophia Walker, Caleb Manson, Matt Powell, Tom Maclean,
              Shivam Shanker
            </p>
            <p className="p-2">
              <strong>Front Row: </strong>Amelia Cave, Abbey Patten, Rohit Guthpe, Aimee Ng, Cullen
              Tran, Lilly Crawford
            </p>
            <p className="p-2">
              <strong>Absent: </strong>Isabella Boswell, Andrew Griffiths
            </p>
          </div>
        </div>
      </div>

      <hr className="border-grey-200 my-6 w-9/10 self-center border-t md:w-full" />
    </div>
  );
}
