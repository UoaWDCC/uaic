import PageHeader from "@/components/PageHeader";

const COMMITTEE_DESCRIPTION =
  "Meet the team responsible for leading the UoA Investment Club and delivering its education, competitions, publications, investment initiatives, and member experiences.";

const CommitteeHeader = () => {
  const currentNztYear = new Intl.DateTimeFormat("en-NZ", {
    year: "numeric",
    timeZone: "Pacific/Auckland",
  }).format(new Date());

  return (
    <section className="w-full bg-[#F4F8FE]">
      <div className="flex w-full flex-col px-6 pt-12 lg:px-16 lg:pt-20">
        <PageHeader
          kicker={currentNztYear}
          title="Executive Committee"
          description={COMMITTEE_DESCRIPTION}
        />
      </div>
    </section>
  );
};

export default CommitteeHeader;
