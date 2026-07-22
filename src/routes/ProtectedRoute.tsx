import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Outlet } from "react-router"
import { Loader } from "../components/ui/Loader"

export function ProtectedRoute() {
    const { user, loading } = useAuth()
  
    if (loading) return <Loader />
    if (!user) return <Navigate to="/login" replace />
  
    return <Outlet />
  }