import { Outlet } from "react-router";

export function PublicLayout() {
    return (
            <main className="py-3">
                <Outlet />
            </main>
    )
}