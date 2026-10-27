
import { apiRequestData } from './client';
import type { DashboardSummary } from '../types';

export function getDashboardSummary(): Promise<DashboardSummary> {
  return apiRequestData<DashboardSummary>('/api/dashboard/summary');
}
