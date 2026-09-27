import ArrowButton from "@/components/ArrowButton";

export default function NotFoundContent() {
  return (
    <div className="bg-surface-faint flex min-h-[calc(100vh-131.75px)] flex-col items-center justify-center px-6 py-[75px] lg:px-[98px]">
      <section className="border-border flex min-h-[506px] w-full max-w-[1244px] flex-col items-center justify-between gap-[26px] rounded-lg border bg-white p-8 shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:flex-row lg:gap-[104px] lg:p-[100px]">
        <div className="flex min-h-[282px] w-full max-w-[470px] flex-col items-center justify-center gap-[26px] text-center lg:items-start lg:text-left">
          <div className="flex flex-col gap-[10px]">
            <div>
              <p className="text-primary-light mb-[6px] text-[20px] leading-[27.16px] font-bold tracking-normal">
                404 Not Found
              </p>
              <h1 className="text-ink text-[40px] leading-[52px] font-bold tracking-normal sm:text-[52px] sm:leading-[68px]">
                Oops! We Couldn't Find That Page.
              </h1>
            </div>
            <p className="text-muted-foreground max-w-[450px] text-[20px] leading-[20px] font-normal tracking-normal">
              This investment didn't diversify very well. The page you're looking for isn't
              available.
            </p>
          </div>

          <ArrowButton text="Back to Home" link="/" />
        </div>

        <div className="order-first flex w-full max-w-[470px] flex-col items-center justify-center gap-[26px] lg:order-last lg:min-h-[282px]">
          <p
            aria-label="Error 404"
            className="text-primary text-[150px] leading-none font-bold tracking-normal sm:text-[200px] lg:text-[240px]"
          >
            404
          </p>
        </div>
      </section>
    </div>
  );
}
