import ToggleGroup from "../ui/ToggleGroup";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { taskTabs } from "../../constants/tabsTasks";
import { CurrentDate } from "../ui/CurrentDate";

export function DashboardHeader() {
    const { tab, date, setTab } = useDashboardFilters();

    return (
        <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-4">
            <div className="hidden lg:block">
                <ToggleGroup
                    active={tab}
                    onChange={setTab}
                    items={taskTabs}
                />
            </div>

            <CurrentDate date={date} />

        </div>
    )
}