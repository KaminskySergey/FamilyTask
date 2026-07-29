import { formatRecurrence } from "@/utils/task";

interface IRecurrenceBadge {
    recurrence: "daily" | "weekly" | "monthly" | null;
    days: number[] | null;
}


export function RecurrenceBadge({
    recurrence,
    days,
}: IRecurrenceBadge) {

    const text = formatRecurrence(recurrence, days);

    if (!text) {
        return (
            <span className="label text-muted">
                -
            </span>
        );
    }

    return (
        <div className="flex flex-col gap-1">

            <span className="label w-fit rounded-full bg-light-blue px-2.5 py-1 uppercase tracking-wide text-muted">
                {recurrence}
            </span>

            <span className="label max-w-40 truncate text-muted">
                {text}
            </span>

        </div>
    );
}