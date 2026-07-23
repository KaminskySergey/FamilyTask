import { Box } from "../ui/Box";
import { Skeleton } from "../ui/Skeleton";


export function LevelCardSkeleton() {
  return (
    <Box>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>

        <Skeleton className="h-8 w-14 rounded-full" />
      </div>

      <Skeleton className="h-4 w-full rounded-full" />
    </Box>
  );
}