import type {
  CreateTaskParams,
  ITask,
  TaskFilters,
} from "../types/task";
import { supabase } from "../lib/supabase";


export async function getTasks(
  filters: TaskFilters & {
    limit?: number;
    offset?: number;
  }
) {
  const [tasksResult, countResult] = await Promise.all([
    supabase.rpc("get_tasks", {
      p_family_id: filters.familyId,
      p_user_id: filters.userId ?? null,
      p_date: filters.date ?? null,
      p_tab: filters.tab ?? null,
      p_priority: filters.priority ?? null,
      p_category: filters.category ?? null,
      p_recurrence: filters.recurrence ?? null,
      p_search: filters.search ?? null,
      p_limit: filters.limit ?? 20,
      p_offset: filters.offset ?? 0,
    }),

    supabase.rpc("get_tasks_count", {
      p_family_id: filters.familyId,
      p_user_id: filters.userId ?? null,
      p_date: filters.date ?? null,
      p_tab: filters.tab ?? null,
      p_priority: filters.priority ?? null,
      p_category: filters.category ?? null,
      p_recurrence: filters.recurrence ?? null,
      p_search: filters.search ?? null,
    }),
  ]);

  if (tasksResult.error) {
    throw new Error(tasksResult.error.message);
  }

  if (countResult.error) {
    throw new Error(countResult.error.message);
  }

  return {
    items: tasksResult.data as ITask[],
    total: Number(countResult.data),
  };
}

export async function getCompletedTasksCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("task_completions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}

export async function createTaskService(params: CreateTaskParams) {
  const deadline =
    !params.is_recurring && params.dueDate
      ? `${params.dueDate}T${params.dueTime ?? "23:59"}:00`
      : null;

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      family_id: params.familyId,
      created_by: params.creatorId,
      assigned_to: params.assigneeId,
      title: params.title,
      description: params.description ?? null,
      deadline,
      priority: params.priority,
      category: params.category,
      xp_reward:
        params.priority === "high" ? 15 : params.priority === "normal" ? 10 : 5,
      is_recurring: params.is_recurring,
      recurrence: params.recurrence ?? null,
      recurrence_days: params.recurrence_days ?? null,
      recurrence_end_date: params.recurrence_end_date ?? null,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function completeTask(
  taskId: string,
  userId: string,
  xpEarned: number,
  recurringDate?: string
) {
  const isRecurring = !!recurringDate;
  const { error: insertError } = await supabase
    .from("task_completions")
    .insert({
      task_id: taskId,
      user_id: userId,
      xp_earned: xpEarned,
      recurring_date: recurringDate ?? null,
    });

  if (insertError) {
    console.log("INSERT ERROR:", insertError);
    throw insertError;
  }

  if (!isRecurring) {
    const { error: updateError } = await supabase
      .from("tasks")
      .update({ status: "DONE" })
      .eq("id", taskId);

    if (updateError) {
      console.log("UPDATE ERROR:", updateError);
      throw updateError;
    }
  }
}

export async function uncompleteTask(
  taskId: string,
  userId: string,
  recurringDate?: string
): Promise<void> {
  let query = supabase
    .from("task_completions")
    .delete()
    .eq("task_id", taskId)
    .eq("user_id", userId);

  if (recurringDate) {
    query = query.eq("recurring_date", recurringDate);
  }

  const { error } = await query;
  if (error) throw error;

  if (!recurringDate) {
    const { error: e } = await supabase
      .from("tasks")
      .update({ status: "PENDING" })
      .eq("id", taskId);
    if (e) throw e;
  }
}

export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
}

export async function changePassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}
