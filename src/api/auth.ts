
import { apiRequest, apiRequestData } from './client';
import type { User } from '../types';

const TOKEN_KEY = 'token';

interface LoginResponse {
    token: string;
    tokenType: string;
    expiresAt: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export async function login(data: LoginData): Promise<LoginResponse> {
    const result = await apiRequestData<LoginResponse>(
        '/api/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
    );

    localStorage.setItem(TOKEN_KEY, result.token);

    return result;
}

export function getCurrentUser(): Promise<User> {
    return apiRequestData<User>('/api/auth/me');
}

export async function logout(): Promise<void> {
    try {
        await apiRequest<unknown>('/api/auth/logout', {
            method: 'POST',
        });
    } finally {
        localStorage.removeItem(TOKEN_KEY);
    }
}
