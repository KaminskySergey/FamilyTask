import type { ITask } from "../types/task";

export function getUserTaskProgress(
  tasks: ITask[],
  userId: string,
  date: string
) {
  const relevantTasks = tasks.filter((task) => task.assigned_to === userId);

  const completed = relevantTasks.filter((task) => {
    if (task.is_recurring) {
      return task.completions?.some(
        (c) => c.recurring_date === date && c.user_id === userId
      );
    }
    return task.status === "DONE";
  }).length;

  return { completed, total: relevantTasks.length };
}

export function getFamilyTaskProgress(tasks: ITask[], date: string) {
  const completed = tasks.filter((task) => {
    if (task.is_recurring) {
      return task.completions?.some((c) => c.recurring_date === date);
    }
    return task.status === "DONE";
  }).length;

  return { completed, total: tasks.length };
}
