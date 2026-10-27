

type Role = 'Admin' | 'Employee';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
type TaskPriority = 'Low' | 'Medium' | 'High';
type ProjectStatus = 'Active' | 'Completed' | 'On Hold';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;            
}

export interface UserSummary { id: number; name: string; }

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;              // "YYYY-MM-DD"
  isOverdue: boolean;           // dueDate passed and status is not Done
  assignedTo: UserSummary;
  createdBy: UserSummary;
  project: { id: number; name: string };
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  startDate: string;            // "YYYY-MM-DD"
  endDate: string | null;
  status: ProjectStatus;
  createdBy: UserSummary;
  taskCount: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  taskId: number;
  content: string;
  user: { id: number; name: string; role: Role };
  createdAt: string;
}

export interface Pagination { page: number; pageSize: number; total: number; totalPages: number; }

export interface DashboardSummary {
  scope: 'all' | 'mine';
  tasks: {
    total: number;
    open: number;
    overdue: number;
    byStatus: { 'To Do': number; 'In Progress': number; 'Done': number };
  };
  projects?: { total: number; active: number };   // Admin only
  employees?: number;                              // Admin only
}

export interface ApiError {
  error: { code: string; message: string; details?: { field: string; message: string }[] };
}

