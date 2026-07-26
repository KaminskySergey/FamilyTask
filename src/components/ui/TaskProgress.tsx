import { Box } from "./Box";

type TaskProgressProps = {
    mode: "personal" | "family"
    completed: number;
    total: number;
};


export function TaskProgress({
    mode,
    completed,
    total
}: TaskProgressProps) {

    const progress =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    const title = mode === "personal"
        ? "My Plan"
        : "Family Plan";
    return (
        <Box>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-h1 font-bold text-text">
                    {title}
                </h3>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-primary text-4xl font-bold">
                    {Math.round(progress)}%
                </div>

                <div className="flex-1 h-3 bg-light-blue rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>
            </div>


            <p className="mt-2 text-text-secondary italic">
                {completed} of {total} tasks completed
            </p>

        </Box>
    );
}