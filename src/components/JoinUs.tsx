import Image from "next/image";

const JoinUs = () => {


    return(
        <>
            <div className="mt-[10em] md:mt-[12em] min-h-[90vh] w-full mx-auto pb-20">

                {/* Join Us container */}
                <div className="">
                    <h1
                    className="mt-6 md:pl-10 text-darkBlue font-bold px-4 text-[19px] md:pl-10 md:text-[20px]">
                    Join Us
                    </h1>
                    <hr className="border-t border-grey-200 w-[95%] mx-auto" />

                    {/* Join Us Description */}
                    <div className="mt-6 md:pl-10 px-4 text-darkBlue leading-relaxed text-[10px] md:text-[13px] self-center">
                        <p>
                            The University of Auckland Investment Club is one of the largest Business School clubs based in Auckland, New Zealand. 
                            <br />
                            <br />
                            We welcome members from all academic backgrounds and stages to commit to our mission that 'Investing is for Everyone' by running competitions, events, and workshops sponsored by leading industry partners.
                        </p>
                    </div>
                </div>

                {/* Membership container */}
                <div className="">
                    <h1
                    className="mt-6 md:pl-10 text-darkBlue font-bold px-4 text-[19px] md:text-[20px]">
                    Membership
                    </h1>
                    <hr className="border-t border-grey-200 w-[95%] mx-auto" />

                    {/* Join Us Description */}
                    <div className="mt-6 md:pl-10 px-4 text-darkBlue leading-relaxed text-[10px] md:text-[13px] self-center">
                        <p>
                            Memberships for 2025 will be active from the sign-up date to the end of the year.
                            <br />
                            <br />
                        </p>
                    {/*uaic2025Membership*/}
                    <div className="flex justify-center">
                        <Image
                            src="/assets/joinus/uaic2025Membership.webp"
                            alt="UAIC Membership 2025 Sign Up Image"
                            width={260}
                            height={366}
                        />
                    </div>
                    {/* Membership price */}
                    <div className="flex justify-center font-bold mt-6">
                        <p>NZ$21.58</p>
                    </div>

                    {/* Top 3 perks of Signing Up */}
                    <div className="flex gap-4">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-blue-100 p-4">Column 1 - Item 1</div>
                        <div className="bg-blue-100 p-4">The sign-up cost is $20 + $1.58 processing fees to become a registered member of UAIC for the remainder of the year. The full $20 fee is put towards the administration of the club. 

</div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-blue-200 p-4">Column 2 - Item 1</div>
                        <div className="bg-blue-200 p-4">All events and competitions that we run are free for members, so you won’t have to pay any more fees after this.</div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-blue-300 p-4">Column 3 - Item 1</div>
                        <div className="bg-blue-300 p-4">Once you have completed payment, you may request to join University of Auckland Investment Club on the University's Engage platform.</div>
                    </div>
                    </div>


                        <p>
                            Fill in this form to be a member of UAIC for 2025! 
                            <br />
                            <br />
                        </p>    
                    </div>
                </div>

                {/* Sign Up to Join Competitions Container */}
                <div className="">
                    <h1
                    className="mt-6 md:pl-10 text-darkBlue font-bold px-4 text-[19px] md:pl-10 md:text-[20px]">
                    Sign Up to Join Competitions
                    </h1>
                    <hr className="border-t border-grey-200 w-[95%] mx-auto" />

                    {/* Sign Up Description */}
                    <div className="mt-6 md:pl-10 px-4 text-darkBlue leading-relaxed text-[10px] md:text-[13px] self-center">
                        <p>
                            Sign up to register competitions Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />
                            <br />
                        
                        </p>
                        {/* Membership Display Image */}
                        <div className="flex justify-center mb-10">
                        <Image
                            src="/assets/joinus/membershipDisplayImage.webp"
                            alt="UAIC Membership Display Image"
                            width={300}
                            height={400}
                            className="brightness-75"
                        />
                        
                    </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default JoinUs;