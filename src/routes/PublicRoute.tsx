import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Outlet } from "react-router"

export function PublicRoute() {
    const { user, loading } = useAuth()
  
    if (loading) return <div>Загрузка...</div>
    if (user) return <Navigate to="/dashboard" replace />
  
    return <Outlet />
  }