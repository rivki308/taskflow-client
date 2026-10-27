import { apiRequestData } from './client';
import type { Comment } from '../types';

export function getTaskComments(
    taskId: number,
): Promise<Comment[]> {
    return apiRequestData<Comment[]>(`/api/tasks/${taskId}/comments`);
}
export function createTaskComment(
    taskId: number,
    content: string,
): Promise<Comment> {
    return apiRequestData<Comment>(`/api/tasks/${taskId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
    });
}
