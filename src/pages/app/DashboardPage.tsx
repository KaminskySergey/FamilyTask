import { Hand } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { useAuth } from "../../hooks/useAuth";
import ToggleGroup from "../../components/ui/ToggleGroup";
import { taskTabs } from "../../constants/tabsTasks";
import { useProfile } from "../../hooks/queries/useProfile";
import { LevelCardSkeleton } from "../../components/dashboard/LevelCardSkeleton";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { format } from "date-fns";
import { useTasks } from "../../hooks/queries/useTasks";
import { useCurrentFamily } from "../../hooks/queries/useFamily";
import { MyTasks } from "../../components/dashboard/MyTasks";
import { getTaskProgress } from "../../utils/task-progress";
import { SmallCalendar } from "../../components/dashboard/SmallCalendar";
import { TasksSkeleton } from "../../components/dashboard/TasksSkeleton";
import { Box } from "../../components/ui/Box";
import { TaskProgress } from "../../components/ui/TaskProgress";
import { Navigate } from "react-router";
import { Loader } from "../../components/ui/Loader";

export default function DashboardPage() {
    const { user } = useAuth()
    if (!user) {
        return <Navigate to="/login" />;
    }
    const { tab, date, setTab, setDate } = useDashboardFilters();
    const { data: profile, isLoading } = useProfile(user.id)
    const { data: family, isLoading: familyLoading } = useCurrentFamily(user.id)
    
    if (familyLoading) {
        return <Loader />;
    }


    if (!family) {
        return <Navigate to="/setup" replace />;
    }
    const {
        data: tasks,
        isLoading: isTasksLoading,
    } = useTasks({
        familyId: family.family_id,
        userId: user.id,
        date,
        owner:
            tab === "personal"
                ? "personal"
                : "family",
    });
    console.log(tasks)

    const mode = tab === "personal"
        ? "personal"
        : "family";

    const taskProgress = getTaskProgress(
        tasks ?? [],
        user.id,
        date
    );

    return (
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Header */}
            <section className="lg:col-span-12 rounded-2xl  p-6 ">
                <div className="flex items-center gap-2">
                    <Hand className="fill-gold w-10 h-10" />
                    <h1 className="h1-extra">
                        Dashboard
                    </h1>
                </div>

                <time
                    dateTime={date}
                    className="h4 text-muted"
                >
                    {format(new Date(date), "EEEE, dd MMMM")}
                </time>
                <h2 className="h1 my-3">Welcome, {profile?.name}!</h2>
                <ToggleGroup active={tab} onChange={setTab} items={taskTabs} />
            </section>

            {/* Left */}
            <section className="lg:col-span-8 space-y-6">

                {isLoading ? <LevelCardSkeleton /> :
                    <Box>
                        <TaskProgress
                            mode={mode}
                            completed={taskProgress.completed}
                            total={taskProgress.total}
                        />
                    </Box>
                }

                {isTasksLoading ? (
                    <TasksSkeleton />
                ) : (
                    <MyTasks
                        date={date}
                        items={tasks ?? []}
                    />
                )}
            </section>

            {/* Right */}
            <aside className="lg:col-span-4 space-y-6 lg:flex lg:flex-col lg:items-start">

                <SmallCalendar
                    date={date}
                    setDate={setDate}
                />

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    ...
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    ...
                </div>

            </aside>

        </Container>
    )
}