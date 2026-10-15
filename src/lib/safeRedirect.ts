// Turns a `?redirect=` value into a path that's safe to send someone to after
// sign-in. Only same-site paths are allowed - anything that could leave the
// site ("//evil.com", "/\evil.com", "https://...") falls back to the default.
export const safeRedirectPath = (value: unknown, fallback = "/dashboard"): string => {
  if (typeof value !== "string" || !value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;

  try {
    // Resolve against a dummy origin: if the result lands anywhere else, the
    // value was smuggling in a host (e.g. via tabs or newlines browsers strip).
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost") return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
};
