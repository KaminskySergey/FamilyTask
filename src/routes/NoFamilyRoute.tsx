import { Navigate, Outlet } from "react-router";
import { Loader } from "../components/ui/Loader";
import { useCurrentFamily } from "../hooks/queries/useFamily";
import { useAuth } from "../hooks/useAuth";

export function NoFamilyRoute() {

    const { user } = useAuth();

    const { data: familyMember, isLoading } = useCurrentFamily(user?.id);

    if (isLoading) {
        return <Loader />;
    }


    if (familyMember?.family_id) {
        return <Navigate to="/dashboard" replace />;
    }


    return <Outlet />;
}