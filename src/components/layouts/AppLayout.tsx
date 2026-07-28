import { Outlet } from "react-router";
import SideBar from "../ui/Sidebar";
import { BottomNavigation } from "../ui/BottomNavigation";

export function AppLayout() {
    return (
        <div className="flex h-screen flex-col overflow-hidden">

            {/* Header */}
            {/* <header className="h-16 shrink-0 bg-blue text-white flex items-center px-6">
                Header
            </header> */}


            {/* Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <SideBar />

                {/* Mobile navigation */}
                <BottomNavigation />


                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-background p-4 pb-24 xl:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}