import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { Box } from "../ui/Box";
import { format, parseISO } from "date-fns";

interface ISmallCalendar {
    date: string;
    setDate: (date: string) => void;
}

export function SmallCalendar({ date, setDate }: ISmallCalendar) {

    return (
        <Box className="w-full">
            <DayPicker
                mode="single"
                selected={parseISO(date)}
                onSelect={(day) => {
                    if (day) {
                        setDate(format(day, "yyyy-MM-dd"));
                    }
                }}
                className="w-full"
                classNames={{
                    months: "w-full",
                    month: "w-full",
                    month_grid: "w-full",

                    weekdays: "flex justify-between w-full h3",
                    weekday: "flex-1 text-center h3 text-muted",

                    weeks: "w-full",
                    week: "flex justify-between w-full",
                    caption_label: "h3",
                    day: "flex-1 h4 aspect-square flex items-center justify-center",

                    day_button:
                        "w-10 h-10 flex items-center justify-center rounded-full text-lg transition hover:bg-primary/10 cursor-pointer",

                    selected:
                        "bg-primary text-white rounded-full",

                    today:
                        "text-primary font-extrabold",

                    button_previous:
                        "w-10 h-10 fill-primary cursor-pointer hover:bg-primary/10 rounded-md",

                    button_next:
                        "w-10 h-10 text-primary cursor-pointer hover:bg-primary/10 rounded-md",
                }}
            />
        </Box>
    );
}