import { NavLink, useSearchParams } from "react-router";
import { cn } from "../../utils/cn";
import { useTaskFilters } from "@/hooks/useTaskFilters";

export const taskStatusTabs = [
    {
        id: "open",
        label: "Open",
    },
    {
        id: "completed",
        label: "Completed",
    },
    {
        id: "all",
        label: "All",

    },
] as const;

export function TabsTasks() {
    const {
        tab,
        setTab,
    } = useTaskFilters();


    return (
        <ul className="inline-flex items-center gap-6">
            {taskStatusTabs.map((item) => (
                <li key={item.id}>
                    <button
                        onClick={() => setTab(item.id)}
                        className={cn(
                            "relative inline-block px-1 py-2 h4 transition-all",
                            tab === item.id
                                ? "text-primary font-bold after:absolute after:-bottom-px after:left-0 after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']"
                                : "text-text hover:text-primary"
                        )}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}