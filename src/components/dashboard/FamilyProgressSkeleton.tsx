import { Box } from "../ui/Box";

export function FamilyProgressSkeleton() {
    return (
      <Box className="quest-card bg-white w-full  p-6 rounded-lg animate-pulse">
        <div className="h-5 w-32 bg-surface-container rounded mb-6" />
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-container" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="h-4 w-20 bg-surface-container rounded" />
                  <div className="h-3 w-8 bg-surface-container rounded" />
                </div>
                <div className="h-1.5 bg-surface-container rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </Box>
    );
  }