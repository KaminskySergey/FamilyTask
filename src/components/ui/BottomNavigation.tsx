import { CalendarCheck2, LayoutDashboard, ListTodo, Settings, Users } from "lucide-react";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { ItemTab } from "./ItemTab";

export function BottomNavigation() {
    const { date } = useDashboardFilters();

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-1 max-w-md rounded-full border border-white/30 bg-white/80 p-2 shadow-xl backdrop-blur-xl xl:hidden">
            <ItemTab
                href="/dashboard"
                label="Dashboard"
                icon={<LayoutDashboard size={20} />}
            />

            <ItemTab
                href={`/calendar/${date}`}
                label="Calendar"
                icon={<CalendarCheck2 size={20} />}
            />

            <ItemTab
                href="/tasks"
                label="Tasks"
                icon={<ListTodo size={20} />}
            />

            <ItemTab
                href="/family"
                label="Family"
                icon={<Users size={20} />}
            />

            <ItemTab
                href="/settings"
                label="Settings"
                icon={<Settings size={20} />}
            />
        </nav>
    );
}