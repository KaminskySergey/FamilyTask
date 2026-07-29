import { useCompleteTask, useUncompleteTask } from "../../hooks/queries/useTasks";
import { useAuth } from "../../hooks/useAuth";
import type { ITask } from "../../types/task";
import { TASK_CATEGORIES } from "../../constants/tasks";
import { Check, Star } from "lucide-react";
import { cn } from "../../utils/cn";
import { Avatar } from "../ui/Avatar";
import { format } from "date-fns";

type Props = {
    task: ITask;
    selectedDate?: string;
};

export function TaskCard({
    task,
    selectedDate,
}: Props) {

    const { user } = useAuth();

    const {
        mutate: complete,
        isPending: isCompleting,
    } = useCompleteTask();

    const {
        mutate: uncomplete,
        isPending: isUncompleting,
    } = useUncompleteTask();


    const isPending =
        isCompleting || isUncompleting;


    const recurringDate = task.is_recurring
        ? selectedDate
        : undefined;

    const isDone = task.is_recurring
        ? task.completions?.some(
            (c) =>
                c.user_id === user?.id &&
                c.recurring_date === recurringDate
        ) ?? false
        : task.status === "DONE";

    const toggleDone = () => {

        if (isPending || !user) return;


        if (isDone) {

            uncomplete({
                taskId: task.id,
                userId: user.id,
                familyId: task.family_id,
                recurringDate,
            });

        } else {

            complete({
                taskId: task.id,
                userId: user.id,
                familyId: task.family_id,
                xpEarned: task.xp_reward,
                recurringDate,
            });

        }
    };


    const taskCategory =
        TASK_CATEGORIES.find(
            (cat) => cat.key === task.category
        );

    const CategoryIcon = taskCategory?.icon;

    return (
        <li onClick={toggleDone} className={cn(
            "flex flex-col sm:flex-row sm:items-center cursor-pointer gap-4 p-4 rounded-3xl sm:rounded-full border transition-all group",
            isDone
                ? "bg-success-bg/30 border-success/70 hover:border-success/90"
                : "bg-white border-surface-container-high hover:border-primary/30"
        )}>

            <div className="flex items-center gap-3 shrink-0 pl-1">
                <div
                    className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors group-hover:border-primary",
                        isDone ? "border-success bg-success text-white" : "border-outline-variant"
                    )}
                >
                    {isDone && <Check size={16} />}
                </div>

                {task.priority && (
                    <span
                        className={cn(
                            "px-2 py-0.5 rounded-full body font-bold uppercase tracking-wider",
                            {
                                "bg-blue-bg text-blue": task.priority === "low",
                                "bg-primary-light text-primary": task.priority === "normal",
                                "bg-warning-bg text-warning": task.priority === "high",
                            }
                        )}
                    >
                        {task.priority}
                    </span>
                )}
            </div>

            <div className="flex-1 min-w-0 px-1 flex flex-col gap-1">

                <div className="flex items-center gap-2">
                    {CategoryIcon && (
                        <CategoryIcon
                            size={16}
                            className="text-primary shrink-0"
                        />
                    )}

                    <h3 className="font-bold h3 truncate">
                        {task.title}
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                    {task.assignee && (
                        <div className="inline-flex items-center gap-1.5 pl-1 pr-2.5 py-0.5 rounded-full bg-background border border-surface-container-high text-xs text-on-surface-variant font-medium">
                            <Avatar size="sm" avatarUrl={task.assignee.avatar_url} />
                            <span className="truncate">
                                {task.assignee.name}
                            </span>
                        </div>
                    )}


                </div>

                <div className="min-h-5 mt-1 pl-1">
                    {task.description && (
                        <div className="flex items-center gap-1 h4 text-text">
                            <span className="font-medium">
                                Description:
                            </span>
                            <p className="line-clamp-1">
                                {task.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-none border-border pr-2">
                {task.deadline && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-light-blue  text-text font-medium">
                        <span className="opacity-60">by</span>
                        <span>{format(new Date(task.deadline), "HH:mm")}</span>
                    </div>
                )}

                {task.recurrence && (
                    <span className="px-2.5 py-0.5 rounded-full h4 uppercase bg-light-blue text-muted font-bold tracking-wide ">
                        {task.recurrence}
                    </span>
                )}
                <div className="px-3 py-1 rounded-full border border-gold flex items-center gap-1 bg-gold-bg">
                    <Star size={12} className="text-gold" />
                    <span className="text-xs font-bold text-gold">
                        +{task.xp_reward} XP
                    </span>
                </div>
            </div>

        </li>
    );
}