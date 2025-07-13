import React from "react";

const Bulletin = () => {
    return (
        <div className="hidden lg:visible max-w-5xl aspect-4/3 mx-auto p-6 lg:grid grid-cols-5 grid-rows-4 gap-6 bg-white relative">

            <div className="
                col-span-2 row-span-3 rounded-2xl relative bg-lightBlue flex justify-center p-8  
            ">
                <img src="/assets/bulletin_cover.jpg" alt="Cover Image" className="w-full rounded-xl"/>
            </div>

            <span className="col-start-1 col-end-3 row-start-1 row-end-2 bg-lightBlue z-2 absolute -right-[1rem] w-[2rem] h-[1rem]" />
            <span className="col-start-1 col-end-3 row-start-2 row-end-3 bg-lightBlue z-2 absolute -right-[1rem] bottom-0 w-[1rem] h-[1rem]" />
            <span className="
                col-start-1 col-end-3 row-start-2 row-end-3 z-2 absolute -right-[1rem] -bottom-[1rem]
                w-[1rem] h-[1rem] [background-image:radial-gradient(circle_at_100%_100%,transparent_1rem,#EBF7FE_1rem)]
            " />

            {/* Most recent (MAIN) */}
            <div className="
                col-span-3 row-span-2 rounded-2xl text-darkBlue p-6 relative flex flex-col justify-between
                bg-lightBlue -ml-6
            ">
                <div className="h-full ml-4 mt-2 flex flex-col justify-start font-semibold">
                    <h2 className="text-xl">Issue #79</h2>
                    <p className="text-[28px] mt-2 leading-[1.2]">
                    Isn't There Something Wrong with a World Where Everything is For Sale?
                    </p>
                    <p className="text-m font-normal max-w-[85%] mt-4">
                    A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC's Spark, the value of fine art as an investment, and Rivian's dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand's water quality challenges.
                    </p>
                </div>

                <img src="/assets/bulletin_book_blue.png" className="w-10 absolute bottom-6 right-6" />
            </div>

            {/* MINI 1 */}
            <div className="
                col-span-3 row-span-1 rounded-2xl text-white p-6 relative flex flex-col justify-between
                bg-cover bg-center bg-darkBlue/50 bg-blend-multiply bg-[url('/assets/sample_article_1.png')]
                hover:brightness-90 transition cursor-pointer
            ">
                <div className="max-w-[85%] h-full ml-4 flex flex-col justify-center font-semibold">
                    <p className="text-xl">Issue #78</p>
                    <p className="text-3xl mt-2">
                    Measuring Up? New Zealand's Standardised Testing Debate
                    </p>
                </div>

                <img src="/assets/bulletin_book_icon.png" className="w-10 absolute bottom-6 right-6" />
            </div>

            {/* MINI 2 */}
            <div className="
                col-span-3 row-span-1 rounded-2xl text-white p-6 relative flex flex-col justify-between
                bg-cover bg-center bg-darkBlue/50 bg-blend-multiply bg-[url('/assets/sample_article_2.png')]
                hover:brightness-90 transition cursor-pointer
            ">
                <div className="max-w-[85%] h-full ml-4 flex flex-col justify-center font-semibold">
                    <p className="text-xl">Issue #77</p>
                    <p className="text-3xl mt-2">
                    A House of Cards: The History of Fletcher Building
                    </p>
                </div>

                <img src="/assets/bulletin_book_icon.png" className="w-10 absolute bottom-6 right-6" />
            </div>

            {/* Want to see more */}
            <div className="
                col-span-2 row-span-1 rounded-2xl text-white font-semibold p-6 relative flex items-center justify-left
                bg-darkBlue hover:brightness-90 transition cursor-pointer
            ">
                <div className="ml-4">
                    <p className="text-3xl leading-[0.9]">Want to <br/> see more?</p>
                    <p className="text-xl mt-3 underline">Click to View All</p>
                </div>

                <img src="/assets/external_link_icon.png" className="w-10 absolute bottom-6 right-6" />
            </div>

        </div>
    );
};

export default Bulletin;