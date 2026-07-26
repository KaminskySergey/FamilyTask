import { useFamilyMembers } from "../../hooks/queries/useFamily";
import type { ITask } from "../../types/task";
import { cn } from "../../utils/cn";
import { getUserTaskProgress } from "../../utils/task-progress";
import { Avatar } from "../ui/Avatar";
import { Box } from "../ui/Box";
import { FamilyProgressSkeleton } from "./FamilyProgressSkeleton";

interface FamilyProgressProps {
  familyId: string
  tasks: ITask[];
  date: string;
}

const progressColors = [
  { border: "border-success", bar: "bg-success" },
  { border: "border-primary", bar: "bg-primary" },
  { border: "border-gold", bar: "bg-gold" },
];

export default function FamilyProgress({
  familyId,
  tasks,
  date,
}: FamilyProgressProps) {
  const { data: members, isLoading } = useFamilyMembers(familyId);

  if (isLoading) {
    return <FamilyProgressSkeleton />;
  }

  return (
    <Box className="space-y-4 w-full">
      <h2 className="h2 text-text mb-6">Family today</h2>

      <ul className="space-y-5">
        {(members ?? []).map((member, index) => {
          const progress = getUserTaskProgress(tasks, member.profiles.id, date);
          const percent =
            progress.total === 0
              ? 0
              : Math.round((progress.completed / progress.total) * 100);

          const color = progressColors[index % progressColors.length];

          return (
            <li key={member.id} className="flex items-center gap-4">
              <div className={cn("rounded-full border-2 p-0.5", color.border)}>
                <Avatar
                  name={member.profiles.name}
                  avatarUrl={member.profiles.avatar_url}
                  size="md"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-on-surface text-label-lg">
                    {member.profiles.name || "User"}
                  </span>
                  <span className="text-xs text-on-surface-variant font-bold">
                    {percent}%
                  </span>
                </div>

                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={cn("h-full", color.bar)}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}