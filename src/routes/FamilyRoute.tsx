import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Loader } from "../components/ui/Loader"
import { useCurrentFamily } from "../hooks/queries/useFamily";

export function FamilyRoute() {
    const { user, loading } = useAuth();

    const {
        data: familyMember,
        isLoading: familyLoading,
    } = useCurrentFamily(user?.id);


    if (loading || familyLoading) {
        return <Loader />;
    }


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (!familyMember?.family_id) {
        return <Navigate to="/setup" replace />;
    }


    return <Outlet />;
}