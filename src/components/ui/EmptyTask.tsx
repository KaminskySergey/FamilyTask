import { Cat } from "lucide-react";

export const EmptyTasks = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-80">
            <div className="p-4 rounded-xl bg-primary-light text-primary mb-4 animate-bounce [animation-duration:3s]">
                <Cat className="w-12 h-12 stroke-[1.5]" />
            </div>

            <h3 className="h2 text-text tracking-tight mb-1">
                Nothing here yet
            </h3>

            <p className="h4 text-muted max-w-70 mb-6">
                The cat searched everywhere, but couldn't find any tasks for today.
            </p>
        </div>
    );
};