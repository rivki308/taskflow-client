import type { Project } from '../types';
import { apiRequestData, buildPath } from './client';


export interface CreateProjectData {
  name: string;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
  status?: Project['status'];
}

export interface ProjectFilters {
  status?: Project['status'];
  search?: string;
}

export function getProjects(filters: ProjectFilters = {}): Promise<Project[]> {
  return apiRequestData<Project[]>(buildPath('/api/projects', filters));
}

export function createProject(
  data: CreateProjectData,
): Promise<Project> {
  return apiRequestData<Project>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export function getProject(id: number): Promise<Project> {
  return apiRequestData<Project>(`/api/projects/${id}`);
}
export type UpdateProjectData = Partial<CreateProjectData>;

export function updateProject(
  id: number,
  data: UpdateProjectData,
): Promise<Project> {
  return apiRequestData<Project>(`/api/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
