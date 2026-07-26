import { format } from "date-fns";
import ToggleGroup from "../ui/ToggleGroup";
import { CalendarIcon } from "lucide-react";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { taskTabs } from "../../constants/tabsTasks";

export function DashboardHeader() {
    const { tab, date, setTab } = useDashboardFilters();
    
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <ToggleGroup active={tab} onChange={setTab} items={taskTabs} />

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

        </div>
    )
}