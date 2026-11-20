// Returns an error message string, or null if the workout body is valid.
export function validateWorkout(body) {
  const { name, date } = body ?? {};
  if (typeof name !== "string" || !name.trim()) return "name is required";
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "date is required (YYYY-MM-DD)";
  }
  return null;
}
