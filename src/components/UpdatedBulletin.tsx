import React from "react";
import "../app/(home)/globals.css"

const UpdatedBulletin = () => {
    return (
        <div className="max-w-6xl aspect-4/3 mx-auto p-6 grid grid-cols-5 grid-rows-4 gap-6 bg-white">

            <div className="
                col-span-2 row-span-3 rounded-2xl relative bg-lightBlue flex justify-center    
            ">
                <span>bulletin image goes here</span>
            </div>

            {/* Most recent (MAIN) */}
            <div className="
                col-span-3 row-span-2 rounded-2xl overflow-hidden relative bg-cover bg-center text-darkBlue
            ">
                <div className="absolute inset-0 bg-lightBlue bg-opacity-50 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-bold">Issue #79</h2>
                    <p className="text-xl font-semibold mt-2 leading-tight">
                    Isn't There Something Wrong with a World Where Everything is For Sale?
                    </p>
                </div>
                <p className="text-sm mt-4 opacity-80">
                    Includes partner column on NZ's water quality challenges.
                </p>
                </div>
            </div>

            {/* MINI 1 */}
            <div className="
                col-span-3 row-span-1 relative rounded-2xl text-white p-6 flex flex-col justify-between
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
                    <p className="text-4xl leading-[0.9]">Want to <br/> see more?</p>
                    <p className="text-xl mt-5 underline">Click to View All</p>
                </div>

                <img src="/assets/external_link_icon.png" className="w-10 absolute bottom-6 right-6" />
            </div>

        </div>
    );
};

export default UpdatedBulletin;