
type LevelProgressProps = {
    title: string;
    level: number;
    currentXP: number;
    nextLevelXP: number;
    completedTasks: number;
    totalTasks: number;
    mode: "personal" | "family";

};


export function LevelProgress({
    title,
    level,
    currentXP,
    nextLevelXP,
    completedTasks,
    totalTasks,
    mode

}: LevelProgressProps) {

    const progress =
        Math.min(
            (currentXP / nextLevelXP) * 100,
            100
        );
    const xpLeft =
        Math.max(
            nextLevelXP - currentXP,
            0
        );
    const isShow = mode === "personal" ? true : false
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-h1 font-bold text-text">
                    {title}
                </h3>
                {isShow && <span className="px-3 py-1 bg-gold-light rounded-full">
                    {xpLeft} XP to Level {level + 1}
                </span>}
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
            <p className="mt-4 text-text-secondary italic">
                {completedTasks} of {totalTasks} tasks completed
            </p>
        </div >

    );

}