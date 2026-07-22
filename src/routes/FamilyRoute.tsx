import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Loader } from "../components/ui/Loader"
import { useCurrentFamily } from "../hooks/queries/useFamily";

export function FamilyRoute() {
    const { user } = useAuth();

    const {
        data: familyMember,
        isLoading
    } = useCurrentFamily(user?.id);


    if (isLoading) {
        return <Loader />;
    }


    if (!familyMember?.family_id) {
        return <Navigate to="/setup" replace />;
    }


    return <Outlet />;
}