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
    <div className="w-full mx-auto p-4 lg:px-10 bg-white rounded-lg">
      <div>
        <span className="font-bold md:text-[20px] text-darkBlue">
          Investment Committee
        </span>

        <div className="text-sm text-darkBlue flex flex-col items-center">
          <div className="w-9/10 flex flex-col items-center">
            <p className="mb-4">
              The Investment Committee is responsible for managing the club's
              fund, including:
            </p>

            <ul className="list-disc list-inside mb-4 text-left">
              <li>
                Ensuring all investments are in line with the fund's value
                investing thesis
              </li>
              <li>
                Regularly pitching and analysing potential stock investments
              </li>
              <li>
                Voting to decide whether an investment passes to the next
                stage of approval
              </li>
            </ul>

            <div className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="investment-committee"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span>Image not available</span>
                </div>
              )}
            </div>
          </div>

          <div className="items-center text-center mt-4">
            <p className="p-2">
              <strong>Back Row: </strong>Max Wilson, Sam Gowen, Caden Van De
              Laak
            </p>
            <p className="p-2">
              <strong>Middle Row: </strong>Sophia Walker, Caleb Manson, Matt
              Powell, Tom Maclean, Shivam Shanker
            </p>
            <p className="p-2">
              <strong>Front Row: </strong>Amelia Cave, Abbey Patten, Rohit
              Guthpe, Aimee Ng, Cullen Tran, Lilly Crawford
            </p>
            <p className="p-2">
              <strong>Absent: </strong>Isabella Boswell, Andrew Griffiths
            </p>
          </div>
        </div>
      </div>

      <hr className="border-t border-grey-200 w-9/10 md:w-full self-center my-6" />
    </div>
  );
}
