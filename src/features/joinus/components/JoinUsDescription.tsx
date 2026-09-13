const JoinUsDescription = () => {
  return (
    <>
      {/* Join Us container */}
      <div className="pr-3 pl-3 sm:pr-10 sm:pl-10">
        <h1 className="text-header text-darkBlue mt-2 px-4 font-bold md:pl-10">Join Us</h1>
        <hr className="border-grey-200 mx-auto w-[95%] border-t" />

        {/* Join Us Description */}
        <div className="text-body text-darkBlue mt-6 self-center px-4 leading-relaxed font-normal md:pl-10">
          <p>
            The University of Auckland Investment Club is one of the largest Business School clubs
            based in Auckland, New Zealand. We welcome members from all academic backgrounds and
            stages to commit to our mission that 'Investing is for Everyone' by running
            competitions, events, and workshops sponsored by leading industry partners.
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinUsDescription;
