export function maskStudentID(value: string, visibleChars = 2) {
  if (!value) {
    return "—";
  }
  const studentID = value.trim();
  const masked = "•".repeat(Math.max(0, studentID.length - visibleChars));
  return masked + studentID.slice(-visibleChars);
}
