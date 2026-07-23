import type { ReactElement } from "react"
import { useSidebarContext } from "../../contexts/SibebarContext"
import { cn } from "../../utils/cn"
import { NavLink } from "react-router"

interface IItemNav {
    href: string
    link: string
    icon: ReactElement

}

export default function ItemNav({ href, link, icon }: IItemNav) {
    const { isSidebarOpen } = useSidebarContext()

    return (
        <li key={link}>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    cn(
                        "relative flex items-center gap-4 px-2 py-2 rounded-2xl font-medium text-sm hover:bg-gray-200 transition-colors",
                        isActive && "bg-[#F2E9FA] text-primary rounded-full"
                    )
                }
            >
                {({ isActive }) => (
                    <>
                        {isActive && isSidebarOpen && (
                            <div className="absolute left-0 w-1 h-8 bg-[#8127cf] rounded-r-[4px]" />
                        )}

                        <p>{icon}</p>

                        <p
                            className={cn("transition-opacity h3 duration-300", {
                                "opacity-0 w-0": !isSidebarOpen,
                                "opacity-100 w-auto": isSidebarOpen,
                            })}
                        >
                            {link}
                        </p>
                    </>
                )}

            </NavLink>
        </li>
    );
}