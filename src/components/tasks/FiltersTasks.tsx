import { FilterSelect } from "@/components/tasks/FilterSelect";
import { Calendar, Flag, Folder, Repeat } from "lucide-react";

export function FiltersTasks() {
    return (
        <div className="flex gap-6">
            <FilterSelect
                icon={<Calendar size={18} className="text-primary" />}
                placeholder="Date"
                options={["Today", "Tomorrow", "This week"]}
            />

            <FilterSelect
                icon={<Flag size={18} className="text-primary" />}
                placeholder="Priority"
                options={["High", "Medium", "Low"]}
            />

            <FilterSelect
                icon={<Repeat size={18} className="text-primary" />}
                placeholder="Repeat"
                options={["Daily", "Weekly", "Monthly"]}
            />

            <FilterSelect
                icon={<Folder size={18} className="text-primary" />}
                placeholder="Category"
                options={["Home", "Study", "Finance"]}
            />
        </div>
    )
}