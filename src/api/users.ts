import type { User } from '../types';
import { apiRequestData, buildPath } from './client';

export interface UserFilters {
  role?: User['role'];
  search?: string;
}



export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: User['role'];
}

export function getUsers(filters: UserFilters = {}): Promise<User[]> {
  return apiRequestData<User[]>(buildPath('/api/users', filters));
}
export function createUser(
  data: CreateUserData,
): Promise<User> {
  return apiRequestData<User>('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

