import { format, getDay, getDate, parseISO } from "date-fns";
import type { CreateTaskParams, ITask, TaskFilters } from "../types/task";
import { supabase } from "../lib/supabase";

const PROFILE_SELECT = `
  id,
  email,
  name,
  avatar_emoji,
  avatar_url,
  role,
  xp,
  streak,
  created_at
`;

const TASK_SELECT = `
  *,
  completions:task_completions(*),
  assignee:profiles!tasks_assigned_to_fkey (${PROFILE_SELECT}),
  creator:profiles!tasks_created_by_fkey (${PROFILE_SELECT})
`;

export async function getTasks({
  familyId,
  userId,
  date,
}: TaskFilters): Promise<ITask[]> {
  let onetimeQuery = supabase
    .from("tasks")
    .select(TASK_SELECT)
    .eq("family_id", familyId)
    .eq("is_recurring", false);

  let recurringQuery = supabase
    .from("tasks")
    .select(TASK_SELECT)
    .eq("family_id", familyId)
    .eq("is_recurring", true);

  if (userId) {
    onetimeQuery = onetimeQuery.eq("assigned_to", userId);

    recurringQuery = recurringQuery.eq("assigned_to", userId);
  }

  if (date) {
    const parsedDate = parseISO(date);

    const from = `${date}T00:00:00`;
    const to = `${date}T23:59:59`;

    const dayOfWeek = getDay(parsedDate);
    const dayOfMonth = getDate(parsedDate);

    onetimeQuery = onetimeQuery
      .gte("deadline", from)
      .lte("deadline", to)
      .order("deadline", {
        ascending: true,
      });

    recurringQuery = recurringQuery
      .or(
        [
          "recurrence.eq.daily",
          `and(recurrence.eq.weekly,recurrence_days.cs.{${dayOfWeek}})`,
          `and(recurrence.eq.monthly,recurrence_days.cs.{${dayOfMonth}})`,
        ].join(",")
      )
      .or(`recurrence_end_date.is.null,recurrence_end_date.gte.${from}`);
  }

  const [
    { data: onetime, error: oneTimeError },
    { data: recurring, error: recurringError },
  ] = await Promise.all([onetimeQuery, recurringQuery]);

  if (oneTimeError) {
    throw new Error(oneTimeError.message);
  }

  if (recurringError) {
    throw new Error(recurringError.message);
  }

  return [...(onetime ?? []), ...(recurring ?? [])] as ITask[];
}

export async function getMyTodayTasks(userId: string): Promise<ITask[]> {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const from = `${todayStr}T00:00:00`;
  const to = `${todayStr}T23:59:59`;
  const dayOfWeek = getDay(new Date());
  const dayOfMonth = getDate(new Date());
  const [{ data: onetime, error: e1 }, { data: recurring, error: e2 }] =
    await Promise.all([
      supabase
        .from("tasks")
        .select(TASK_SELECT)
        .eq("assigned_to", userId)
        .eq("is_recurring", false)
        .neq("status", "DONE")
        .gte("deadline", from)
        .lte("deadline", to)
        .order("deadline", { ascending: true }),

      supabase
        .from("tasks")
        .select(TASK_SELECT)
        .eq("assigned_to", userId)
        .eq("is_recurring", true)
        .or(
          `recurrence.eq.daily,` +
            `and(recurrence.eq.weekly,recurrence_days.cs.{${dayOfWeek}}),` +
            `and(recurrence.eq.monthly,recurrence_days.cs.{${dayOfMonth}})`
        )
        .or(`recurrence_end_date.is.null,recurrence_end_date.gte.${from}`),
    ]);
  if (e1) throw new Error(e1.message);
  if (e2) throw new Error(e2.message);

  return [...(onetime ?? []), ...(recurring ?? [])] as unknown as ITask[];
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
