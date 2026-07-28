import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface ICurrentDate {
    date: string
}

export function CurrentDate({ date }: ICurrentDate) {
    return (
        <div className="flex items-center gap-3 md:text-right">
            <div>
                <span className="text-points font-semibold text-muted uppercase tracking-wider block">
                    Current Date
                </span>
                <time dateTime={date} className="text-h2 font-black text-text tracking-tight block">
                    {format(new Date(date), "EEEE, dd MMMM")}
                </time>
            </div>

            <div className="p-2 rounded-md bg-primary/10 text-primary">
                <CalendarIcon className="w-5 h-5" />
            </div>
        </div>
    )
}