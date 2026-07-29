import { WEEKDAY_LABELS } from "@/constants/tasks";

function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";

    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export function formatRecurrence(
  recurrence: "daily" | "weekly" | "monthly" | null,
  recurrenceDays: number[] | null
): string | null {
  if (!recurrence) return null;

  if (recurrence === "daily") {
    return "Every day";
  }

  if (recurrence === "weekly") {
    if (!recurrenceDays?.length) {
      return "Every week";
    }

    return recurrenceDays
      .sort((a, b) => a - b)
      .map((day) => WEEKDAY_LABELS[day])
      .join(", ");
  }

  if (recurrence === "monthly") {
    if (!recurrenceDays?.length) {
      return "Every month";
    }

    const days = recurrenceDays
      .sort((a, b) => a - b)
      .map((day) => `${day}${getOrdinalSuffix(day)}`)
      .join(", ");

    return `Every month on ${days}`;
  }

  return recurrence;
}
