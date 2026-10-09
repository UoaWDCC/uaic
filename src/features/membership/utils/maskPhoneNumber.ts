export function maskPhoneNumber(value: string, visibleDigits = 2) {
  if (!value) {
    return "—";
  }
  const digitsOnly = value.replace(/\D/g, ""); /* strip non-digits */
  if (digitsOnly.length <= visibleDigits) return value;

  const visible = digitsOnly.slice(-visibleDigits);
  const maskedLength = digitsOnly.length - visibleDigits;

  const groups: string[] = [];
  let remaining = maskedLength;
  const chunkSizes = [4, 3, 3]; /* adjust to match typical NZ mobile format: 0XX XXX XXXX */
  for (const size of chunkSizes) {
    if (remaining <= 0) break;
    const take = Math.min(size, remaining);
    groups.push("•".repeat(take));
    remaining -= take;
  }

  return groups.join(" ") + " " + visible;
}
