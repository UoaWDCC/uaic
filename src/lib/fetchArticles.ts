export async function fetchArticles(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";

  const response = await fetch(`/api/bulletin${query}`, { cache: "no-store" });

  if (!response.ok) return [];

  const data = await response.json();
  return data?.docs || [];
}
