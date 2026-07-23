import type { ReactElement } from "react";
import { cn } from "../../utils/cn";

interface IHero {
    title: string;
    subtitle: string;
    icon: ReactElement;
    className?: string;
}

export function Hero({ title, subtitle, icon, className }: IHero) {
    return (
        <div className={cn("px-5 pt-2 md:pt-10 flex flex-col items-center", className)}>
            <div className="flex flex-col items-center gap-3 md:gap-4 max-w-2xl text-center">
                
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center bg-primary text-white transition-all duration-300">
                    {icon}
                </div>

                <h1 className="h1 md:text-4xl font-extrabold text-text tracking-tight leading-tight">
                    {title}
                </h1>

                <p className="text-muted md:text-lg max-w-md md:max-w-xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

            </div>
        </div>
    );
}