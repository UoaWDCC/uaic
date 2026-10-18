/*
 * Masks all but the last few digits, grouped like an NZ number: 3-3-rest from the left,
 * e.g. "021 123 4567" -> "••• ••• ••67" and "09 123 4567" -> "••• ••• •67".
 */
export function maskPhoneNumber(value: string, visibleDigits = 2) {
  if (!value) {
    return "—";
  }
  const digitsOnly = value.replace(/\D/g, ""); /* strip non-digits */
  if (digitsOnly.length <= visibleDigits) return value;

  const masked = "•".repeat(digitsOnly.length - visibleDigits) + digitsOnly.slice(-visibleDigits);
  const groups = [masked.slice(0, 3), masked.slice(3, 6), masked.slice(6)];
  return groups.filter(Boolean).join(" ");
}
