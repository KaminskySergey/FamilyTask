import type { ITask } from "@/types/task";
import { Avatar } from "../ui/Avatar";
import { formatDate } from "@/utils/date";
import { TASK_CATEGORIES_FOR_TABLE } from "@/constants/tasks";
import { cn } from "@/utils/cn";
import { RecurrenceBadge } from "./RecurrenceBadge";
import { EllipsisVertical } from "lucide-react";

interface ITaskRow {
    task: ITask;
}

export function TaskRow({ task }: ITaskRow) {

    const category = TASK_CATEGORIES_FOR_TABLE[task.category];
    const Icon = category?.icon;

    return (
        <tr className="group transition hover:bg-light-blue/40">

            {/* Task */}
            <td className="px-6 py-4 align-middle">
                <p className="h4 max-w-48 truncate text-text">
                    {task.title}
                </p>
            </td>


            {/* Description */}
            <td className="px-6 py-4 align-middle">
                <p className="body max-w-72 line-clamp-2 leading-5 text-muted">
                    {task.description || "-"}
                </p>
            </td>


            {/* Category */}
            <td className="px-6 py-4 align-middle">
                <div className="flex items-center gap-2 body text-text">

                    {Icon && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
                            <Icon size={16} />
                        </div>
                    )}

                    <span>
                        {category?.label ?? task.category}
                    </span>

                </div>
            </td>


            {/* Assignee */}
            <td className="px-6 py-4 align-middle">
                <div className="flex max-w-48 items-center gap-3">

                    <Avatar
                        avatarUrl={task?.assignee?.avatar_url}
                        name={task?.assignee?.name}
                        size="sm"
                    />

                    <p className="body truncate text-text">
                        {task?.assignee?.name}
                    </p>

                </div>
            </td>


            {/* Deadline */}
            <td className="px-6 py-4 align-middle whitespace-nowrap">
                <span className="body font-semibold text-text">
                    {task.deadline ? formatDate(task.deadline) : "-"}
                </span>
            </td>


            {/* Repeat */}
            <td className="px-6 py-4 align-middle">
                <RecurrenceBadge
                    recurrence={task.recurrence}
                    days={task.recurrence_days}
                />
            </td>


            {/* Priority */}
            <td className="px-6 py-4 align-middle whitespace-nowrap">
                <span
                    className={cn(
                        "label inline-flex items-center rounded-full px-3 py-1 uppercase tracking-wide",
                        {
                            "bg-blue-bg text-blue":
                                task.priority === "low",

                            "bg-primary-light text-primary":
                                task.priority === "normal",

                            "bg-warning-bg text-warning":
                                task.priority === "high",
                        }
                    )}
                >
                    {task.priority}
                </span>
            </td>


            {/* Actions */}
            <td className="px-6 py-4 align-middle whitespace-nowrap">
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-light-blue hover:text-text">
                    <EllipsisVertical size={18} />
                </button>
            </td>

        </tr>
    );
}