import { getLevel } from "../../utils/level";
import { Box } from "../ui/Box";
import { LevelProgress } from "../ui/LevelProggres";

type LevelCardProps = {
    xp: number;
};

export function LevelCard({ xp }: LevelCardProps) {
    const { level, currentXP, nextLevelXP } = getLevel(xp);

    return (
        <Box>
            <LevelProgress
                level={level}
                currentXP={currentXP}
                nextLevelXP={nextLevelXP}
            />
        </Box>
    );
}