import { NavLink, useSearchParams } from "react-router";
import { cn } from "../../utils/cn";

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
    const [searchParams] = useSearchParams();

    const activeTab = searchParams.get("tab") ?? "open";

    return (
        <ul className="inline-flex items-center gap-6">
            {taskStatusTabs.map((tab) => (
                <li key={tab.id}>
                    <NavLink
                        to={`/tasks?tab=${tab.id}`}
                        className={cn(
                            "relative inline-block px-1 py-2 h4 transition-all",
                            activeTab === tab.id
                                ? "text-primary font-bold after:absolute after:-bottom-px after:left-0 after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']"
                                : "text-text hover:text-primary"
                        )}
                    >
                        {tab.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}