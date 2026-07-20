import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Outlet } from "react-router"

export function ProtectedRoute() {
    const { user, loading } = useAuth()
  
    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to="/login" replace />
  
    return <Outlet />
  }