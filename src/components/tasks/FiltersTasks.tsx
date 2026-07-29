import { FilterSelect } from "@/components/tasks/FilterSelect";
import { RECURRENCE_OPTIONS, TASK_CATEGORIES, TASK_PRIORITIES } from "@/constants/tasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { Flag, Folder, Repeat } from "lucide-react";

export function FiltersTasks() {
    const { priority, recurrence, category, setPriority, setRecurrence, setCategory } = useTaskFilters()
    return (
        <div className="flex gap-6">
            <FilterSelect
                icon={<Flag size={18} className="text-primary" />}
                placeholder="Priority"
                options={TASK_PRIORITIES}
                value={priority}
                onChange={setPriority}
            />

            <FilterSelect
                icon={<Repeat size={18} className="text-primary" />}
                placeholder="Repeat"
                options={RECURRENCE_OPTIONS}
                value={recurrence}
                onChange={setRecurrence}
            />

            <FilterSelect
                icon={<Folder size={18} className="text-primary" />}
                placeholder="Category"
                options={TASK_CATEGORIES}
                value={category}
                onChange={setCategory}
            />
        </div>
    )
}