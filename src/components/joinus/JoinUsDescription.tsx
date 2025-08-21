const JoinUsDescription = () => {
  return (
    <>
      {/* Join Us container */}
      <div className="pl-3 pr-3 sm:pl-10 sm:pr-10">
        <h1 className="mt-2 px-4 md:pl-10 text-header font-bold text-darkBlue">
          Join Us
        </h1>
        <hr className="mx-auto w-[95%] border-t border-grey-200" />

        {/* Join Us Description */}
        <div className="mt-6 px-4 md:pl-10 self-center text-body font-normal leading-relaxed text-darkBlue">
          <p>
            The University of Auckland Investment Club is one of the largest Business School clubs based in Auckland, New Zealand.
            We welcome members from all academic backgrounds and stages to commit to our mission that 'Investing is for Everyone' by running competitions, events, and workshops sponsored by leading industry partners.
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinUsDescription;
