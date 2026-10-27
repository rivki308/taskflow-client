
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'token';

interface ApiErrorResponse {
    error: {
        code: string;
        message: string;
        details?: { field: string; message: string }[];
    };
}

interface ApiResponse<T> {
    data: T;
    pagination?: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export class ApiRequestError extends Error {
    code: string;
    details?: { field: string; message: string }[];

    constructor(
        code: string,
        message: string,
        details?: { field: string; message: string }[],
    ) {
        super(message);
        this.name = 'ApiRequestError';
        this.code = code;
        this.details = details;
    }
}

export async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
): Promise<ApiResponse<T> | undefined> {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers = new Headers(options.headers);

    if (!headers.has('Content-Type') && options.body !== undefined) {
        headers.set('Content-Type', 'application/json');
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            window.dispatchEvent(new Event('auth:unauthorized'));
        }

        let errorData: ApiErrorResponse;

        try {
            errorData = (await response.json()) as ApiErrorResponse;
        } catch {
            throw new ApiRequestError(
                'UNKNOWN_ERROR',
                'אירעה שגיאה בתקשורת עם השרת',
            );
        }

        const code = errorData.error?.code ?? 'UNKNOWN_ERROR';
        const message = errorData.error?.message
            ?? 'אירעה שגיאה בעת ביצוע הבקשה';

        throw new ApiRequestError(
            code,
            message,
            errorData.error?.details,
        );
    }

    if (response.status === 204) {
        return undefined;
    }

    return (await response.json()) as ApiResponse<T>;
}

export async function apiRequestData<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const response = await apiRequest<T>(path, options);

    if (!response) {
        throw new ApiRequestError(
            'UNKNOWN_ERROR',
            'התקבלה תשובה לא תקינה מהשרת',
        );
    }

    return response.data;
}

export function buildPath(
    path: string,
    params: object = {},
): string {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') {
            searchParams.set(key, String(value));
        }
    }

    const query = searchParams.toString();
    return query ? `${path}?${query}` : path;
}
