import {
  completeTask,
  createTaskService,
  deleteTask,
  getCompletedTasksCount,
  getMyTodayTasks,
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


export function useMyTodayTasks(userId?: string) {
  return useQuery({
    queryKey: ["tasks", "today", userId],
    queryFn: () => getMyTodayTasks(userId!),
    enabled: !!userId,
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

export function useCompleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      userId,
      xpEarned,
      recurringDate,
    }: {
      taskId: string;
      userId: string;
      xpEarned: number;
      familyId: string;
      recurringDate?: string;
    }) => completeTask(taskId, userId, xpEarned, recurringDate),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["leaderboard", variables.familyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}

export function useUncompleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      userId,
      recurringDate,
    }: {
      taskId: string;
      userId: string;
      familyId: string;
      recurringDate?: string;
    }) => uncompleteTask(taskId, userId, recurringDate),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["leaderboard", variables.familyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
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
