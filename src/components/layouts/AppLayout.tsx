import { Outlet } from "react-router";

export function AppLayout() {
    return (
        <div>
            <aside>Сайдбар с навигацией</aside>
            <main><Outlet /></main>
        </div>
    )
}