export function isUpcomingFlag(value) {
  return (
    value === 1 ||
    value === "1" ||
    value === true ||
    String(value || "").toLowerCase() === "true" ||
    String(value || "").toLowerCase() === "upcoming"
  );
}
