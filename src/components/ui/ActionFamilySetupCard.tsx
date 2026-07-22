import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link } from "react-router";


interface IActionFamilySetupCard {
    variant?: "primary" | "secondary";
    label: string;
    description: string;
    icon: React.ReactNode;
    to: string;
};


export function ActionFamilySetupCard({
    variant = "secondary",
    label,
    description,
    icon,
    to,
}: IActionFamilySetupCard) {
    const isPrimary = variant === "primary";

    return (
        <Link
            to={to}
            className={cn(
                "flex flex-row md:flex-col w-full items-center gap-4 md:gap-6 rounded-3xl p-5 md:p-8 border text-left md:text-center transition-all duration-200",
                "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex-1",
                isPrimary
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-muted/30 text-text"
            )}
        >
            <div
                className={cn(
                    "h-14 w-14 md:h-20 md:w-20 flex items-center justify-center rounded-2xl md:rounded-3xl shrink-0 transition-transform duration-300",
                    isPrimary
                        ? "bg-white/20 text-white"
                        : "bg-primary-light text-primary"
                )}
            >
                {icon}
            </div>

            <div className="flex-1 space-y-1 md:space-y-2 w-full">
                <h3 className="text-h3 md:text-2xl font-bold leading-tight">
                    {label}
                </h3>
                <p className={cn(
                    "text-body text-sm md:text-base max-w-70 md:mx-auto",
                    isPrimary ? "text-white/80" : "text-muted"
                )}>
                    {description}
                </p>
            </div>

            <ChevronRight
                size={24}
                className={cn(
                    "md:hidden",
                    isPrimary ? "text-white" : "text-muted"
                )}
            />
        </Link>
    );
}