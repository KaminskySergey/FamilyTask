import { cn } from "../../utils/cn";

interface IContainer {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: IContainer) {
    return (
        <div className={cn(
            'w-full max-w-[1920px] mx-auto',
            className
        )}>
            {children}
        </div>
    );
}