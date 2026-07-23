type LevelProgressProps = {
    level: number;
    currentXP: number;
    nextLevelXP: number;
};

export function LevelProgress({
    level,
    currentXP,
    nextLevelXP,
}: LevelProgressProps) {
    const progress = Math.min((currentXP / nextLevelXP) * 100, 100);
    const xpLeft = Math.max(nextLevelXP - currentXP, 0);

    return (
        <div >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-h1 font-bold text-text">
                    My Progress
                </h3>

                <span className="px-3 py-1 bg-gold-light text-text font-extrabold rounded-full text-h4">
                    {xpLeft} XP to Level {level + 1}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-primary text-4xl font-bold">
                    {Math.round(progress)}%
                </div>

                <div className="flex-1 h-3 bg-light-blue rounded-full overflow-hidden relative">
                    {/* pattern */}
                    <div
                        className="bg-light-blue"
                    />

                    <div
                        className="h-full bg-primary rounded-full relative transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            {/* <p className="mt-4 text-text-secondary italic">
                1 of 5 tasks completed
            </p> */}
        </div>
    );
}