import { NavLink } from "react-router";
import { cn } from "../../utils/cn";

interface ItemTabProps {
    href: string;
    label: string;
    icon: React.ReactNode;
}

export function ItemTab({
    href,
    label,
    icon,
}: ItemTabProps) {
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                cn(
                    "flex flex-1 flex-col items-center  rounded-full p-2 transition-all",
                    {
                        "bg-primary text-white": isActive,
                        "text-muted hover:bg-primary/10": !isActive,
                    }
                )
            }
        >
            {icon}

            <span className="body font-bold">
                {label}
            </span>
        </NavLink>
    );
}