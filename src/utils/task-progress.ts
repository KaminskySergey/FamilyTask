import type { ITask } from "../types/task";

export function getTaskProgress(
    tasks: ITask[],
    userId: string,
    date: string
) {
    const completed = tasks.filter(task => {

        if (task.is_recurring) {
            return task.completions?.some(
                c =>
                    c.user_id === userId &&
                    c.recurring_date === date
            );
        }

        return task.status === "DONE";
    }).length;


    return {
        completed,
        total: tasks.length,
    };
}