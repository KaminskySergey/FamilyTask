import { ListTodo, CalendarCheck2, Settings, ChevronRight, LayoutDashboard, ChevronLeft, Users } from 'lucide-react'
import { useSidebarContext } from '../../contexts/SibebarContext';
import { cn } from '../../utils/cn';
import ItemNav from './ItemNav';
import { getTodayDate } from '@/utils/date';

export default function SideBar() {
    const { isSidebarOpen, openSidebar, closeSidebar } = useSidebarContext()
    const today = getTodayDate();

    return (
        <aside className={cn("bg-white relative  hidden  shadow-md rounded-br-2xl  xl:flex flex-col justify-between  text-black  h-full transition-width duration-300 ease-in-out px-4 pb-6 pt-3", {
            "w-64": isSidebarOpen,
            "w-18": !isSidebarOpen
        })}>
            <div className='flex flex-col gap-5'>
                <div
                    onClick={closeSidebar}
                    className={cn(
                        "absolute top-3 -right-5 z-50 h-7 w-7 bg-white flex items-center justify-center rounded-lg hover:text-primary cursor-pointer transition-all duration-500",
                        {
                            "opacity-100 translate-x-0": isSidebarOpen,
                            "opacity-0 pointer-events-none -translate-x-2": !isSidebarOpen,
                        }
                    )}
                >
                    <ChevronLeft />
                </div>
                <nav>
                    <ul className='flex flex-col gap-2'>

                        <ItemNav href={`/dashboard?tab=personal&date=${today}`} link="Dashboard" icon={<LayoutDashboard />} />
                        <ItemNav href={`/calendar/${today}`} link="Calendar" icon={<CalendarCheck2 />} />
                        <ItemNav href={`/tasks?tab=open`} link="Tasks" icon={<ListTodo />} />
                        <ItemNav href="/family" link="Family" icon={<Users />} />
                        {/* <ItemNav href="/progress" link="Progress" icon={<ChartNoAxesCombined />} /> */}
                        <ItemNav href="/settings" link="Settings" icon={<Settings />} />
                    </ul>

                </nav>


                <div
                    onClick={openSidebar}
                    className={cn(
                        "absolute top-6 left-15.5 z-50 h-7 w-7 bg-white dark:bg-gray-800 flex items-center justify-center rounded-r-lg hover:text-primary not-odd:cursor-pointer transition-all duration-500 ease-in-out",
                        {
                            "opacity-0 pointer-events-none -translate-x-2": isSidebarOpen,
                            "opacity-100 translate-x-0": !isSidebarOpen,
                        }
                    )}
                >
                    <ChevronRight />
                </div>
            </div>

        </aside>
    );
}
