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
                        setDate(
                            format(day, "yyyy-MM-dd")
                        );
                    }
                }}
                className="w-full"
                classNames={{
                    button_previous: "fill-primary cursor-pointer hover:bg-primary/10 rounded-md",
                    button_next: "text-primary cursor-pointer hover:bg-primary/10 rounded-md",

                    selected: "bg-primary text-white rounded-full",

                    today: "text-primary font-semibold",
                   
                }}
            />
        </Box>
    );
}