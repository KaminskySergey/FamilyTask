import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Outlet } from "react-router"
import { Loader } from "../components/ui/Loader"
import { useCurrentFamily } from "../hooks/queries/useFamily";
export function PublicRoute() {
  const { user, loading } = useAuth();

  const {
    data: familyMember,
    isLoading: familyLoading
  } = useCurrentFamily(user?.id);


  if (loading || familyLoading) {
    return <Loader />;
  }


  if (user) {

    if (!familyMember?.family_id) {
      return <Navigate to="/setup" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }


  return <Outlet />;
}