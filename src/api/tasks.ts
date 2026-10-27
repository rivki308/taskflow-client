
import type { Task, Pagination } from '../types';
import { apiRequest, apiRequestData, buildPath } from './client';
export interface TaskListResponse {
  data: Task[];
  pagination: Pagination;
}

export interface TaskFilters {
  page?: number;
  pageSize?: number;
  status?: Task['status'];
  priority?: Task['priority'];
  assignedTo?: number;
  projectId?: number;
  search?: string;
  overdue?: boolean;
  sortBy?: 'dueDate' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateTaskData {
  title: string;
  description?: string | null;
  priority: Task['priority'];
  status?: Task['status'];
  dueDate: string;
  assignedTo: number;
  projectId: number;
}


export async function getTasks(
  filters: TaskFilters = {},
): Promise<TaskListResponse> {
  const path = buildPath('/api/tasks', filters);
  const response = await apiRequest<Task[]>(path);
  if (!response?.pagination) {
    throw new Error('Invalid tasks response: missing pagination');
  }
  return {
    data: response.data,
    pagination: response.pagination,
  };

}
export function getTask(id: number): Promise<Task> {
  return apiRequestData<Task>(`/api/tasks/${id}`);
}
export function updateTask(
  id: number,
  data: UpdateTaskData,
): Promise<Task> {
  return apiRequestData<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
export async function deleteTask(id: number): Promise<void> {
  await apiRequest<never>(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
export function createTask(data: CreateTaskData): Promise<Task> {
  return apiRequestData<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export type UpdateTaskData = Partial<CreateTaskData>;
