import { format } from "date-fns";

export function getTodayDate() {
    return format(new Date(), "yyyy-MM-dd");
  }


export function formatDate(date: string | null | undefined) {
    if (!date) return "-";

    return format(new Date(date), "EEE, dd MMM · HH:mm")
}