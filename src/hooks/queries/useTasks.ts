import {
  completeTask,
  createTaskService,
  deleteTask,
  getCompletedTasksCount,
  getTasks,
  uncompleteTask,
} from "../../services/task-service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateTaskParams, TaskFilters } from "../../types/task";

export function useTasks(filters: TaskFilters) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
    enabled: !!filters.familyId,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateTaskParams) => createTaskService(params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

interface CompleteTaskVariables {
  taskId: string;
  userId: string;
  xpEarned: number;
  recurringDate?: string;
}

interface UncompleteTaskVariables {
  taskId: string;
  userId: string;
  familyId: string;
  recurringDate?: string;
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      userId,
      xpEarned,
      recurringDate,
    }: CompleteTaskVariables) =>
      completeTask(taskId, userId, xpEarned, recurringDate),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      queryClient.setQueriesData({ queryKey: ["tasks"] }, (old: any) => {
        if (!old || !Array.isArray(old.items)) return old;

        return {
          ...old,
          items: old.items.map((task: any) => {
            if (task.id !== variables.taskId) return task;

            if (task.is_recurring) {
              return {
                ...task,
                completions: [
                  ...(task.completions || []),
                  {
                    task_id: task.id,
                    user_id: variables.userId,
                    xp_earned: variables.xpEarned,
                    recurring_date: variables.recurringDate,
                  },
                ],
              };
            }

            return { ...task, status: "DONE" };
          }),
        };
      });

      return { previousQueries };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, previousData]) => {
          queryClient.setQueryData(queryKey, previousData);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}


export function useUncompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId, recurringDate }: UncompleteTaskVariables) =>
      uncompleteTask(taskId, userId, recurringDate),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      queryClient.setQueriesData({ queryKey: ["tasks"] }, (old: any) => {
        if (!old || !Array.isArray(old.items)) return old;

        return {
          ...old,
          items: old.items.map((task: any) => {
            if (task.id !== variables.taskId) return task;

            if (task.is_recurring) {
              return {
                ...task,
                completions: (task.completions || []).filter(
                  (c: any) =>
                    !(
                      c.user_id === variables.userId &&
                      c.recurring_date === variables.recurringDate
                    )
                ),
              };
            }

            return { ...task, status: "IN_PROGRESS" };
          }),
        };
      });

      return { previousQueries };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, previousData]) => {
          queryClient.setQueryData(queryKey, previousData);
        });
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      if (variables) {
        queryClient.invalidateQueries({
          queryKey: ["leaderboard", variables.familyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", variables.userId],
        });
      }
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useCompletedTasksCount(userId: string) {
  return useQuery({
    queryKey: ["completed-tasks-count", userId],
    enabled: !!userId,
    queryFn: () => getCompletedTasksCount(userId!),
  });
}
