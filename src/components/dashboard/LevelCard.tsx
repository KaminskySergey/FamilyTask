import { getLevel } from "../../utils/level";
import { Box } from "../ui/Box";
import { LevelProgress } from "../ui/LevelProggres";

type LevelCardProps = {
    xp: number;
    mode: "personal" | "family";
    completedTasks: number;
    totalTasks: number;
};


export function LevelCard({
    xp,
    mode,
    completedTasks,
    totalTasks
}: LevelCardProps) {

    const {
        level,
        currentXP,
        nextLevelXP

    } = getLevel(xp);


    return (
        <Box>
            <LevelProgress
                title={
                    mode === "personal"
                        ? "My Progress"
                        : "Family Progress"
                }
                level={level}
                currentXP={currentXP}
                nextLevelXP={nextLevelXP}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                mode={mode}
                
            />
        </Box>
    );
}