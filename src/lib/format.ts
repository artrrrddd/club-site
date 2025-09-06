export function formatDate(input?: string | Date) {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
}