import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'
import type { User } from '../types'
import { type LoginData, getCurrentUser } from '../api/auth'
import { login as apiLogin, logout as apiLogout } from '../api/auth'
import { useQueryClient } from '@tanstack/react-query'
interface AuthContextValue {
    user: User | null
    login: (data: LoginData) => Promise<void>
    logout: () => Promise<void>
    isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(localStorage.getItem('token') !== null)
    const queryClient = useQueryClient();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            getCurrentUser()
                .then((currentUser) => setUser(currentUser))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setIsLoading(false))
        }
        function handleUnauthorized() { setUser(null) }
        window.addEventListener('auth:unauthorized', handleUnauthorized)
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)



    }, [])


    async function login(data: LoginData) {
        const result = await apiLogin(data)
        setUser(result.user)
    }
    async function logout() {
        try {
            await apiLogout()
        } finally {
            setUser(null)
            queryClient.clear()
        }
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used inside AuthProvider')
    return context
}