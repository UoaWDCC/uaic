// Whether onsite event registration (#430) is switched on in this environment.
// On in Vercel Preview/QA, unset (off) in Production, where events keep using
// their external registrationLink. Missing or anything but "true" means off.
//
// NEXT_PUBLIC_ so Payload's admin.condition (which runs in the browser) can see
// it. It's inlined at build time, so changing it in Vercel needs a redeploy.
// Read at call time rather than into a constant so tests can stub it.
export const isOnsiteRegistrationLive = (): boolean =>
  process.env.NEXT_PUBLIC_ONSITE_REGISTRATION === "true";
