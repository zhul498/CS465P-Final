// True if `date` is a real calendar date in YYYY-MM-DD form (rejects 2026-02-30).
const isValidDate = function isValidDate(date) {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
};

// Returns an error message string, or null if the workout body is valid.
export const validateWorkout = function validateWorkout(body) {
  const { name, date } = body ?? {};
  if (typeof name !== "string" || !name.trim()) return "name is required";
  if (!isValidDate(date)) return "date must be a valid date (YYYY-MM-DD)";
  return null;
};
