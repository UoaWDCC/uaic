export function formatDate(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const result =
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds());

  return result;
}
