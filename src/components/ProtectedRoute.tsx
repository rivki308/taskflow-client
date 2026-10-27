import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from'../context/AuthContext'
import Loading from './Loading'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth()

    if (isLoading) return <Loading />
    if (!user) return <Navigate to="/login" replace />
    return children
}