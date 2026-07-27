
import { Container } from "../../components/ui/Container";
import { useAuth } from "../../hooks/useAuth";
import { LevelCardSkeleton } from "../../components/dashboard/LevelCardSkeleton";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";

import { useTasks } from "../../hooks/queries/useTasks";
import { useCurrentFamily } from "../../hooks/queries/useFamily";
import { MyTasks } from "../../components/dashboard/MyTasks";
import { getFamilyTaskProgress, getUserTaskProgress } from "../../utils/task-progress";
import { SmallCalendar } from "../../components/dashboard/SmallCalendar";
import { TasksSkeleton } from "../../components/dashboard/TasksSkeleton";
import { TaskProgress } from "../../components/ui/TaskProgress";
import { Navigate } from "react-router";
import { Loader } from "../../components/ui/Loader";
import FamilyProgress from "../../components/dashboard/FamilyProgress";
import { useMemo } from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import ToggleGroup from "../../components/ui/ToggleGroup";
import { taskTabs } from "../../constants/tabsTasks";

export default function DashboardPage() {
    const { user } = useAuth();

    const { tab, date, setDate, setTab } = useDashboardFilters();

    const { data: family, isLoading: familyLoading } = useCurrentFamily(user?.id);
    const { data: tasks, isLoading: isTasksLoading } = useTasks({ familyId: family?.family_id, date });


    if (!user) {
        return <Navigate to="/login" />;
    }
    if (familyLoading) {
        return <Loader />;
    }
    if (!family) {
        return <Navigate to="/setup" replace />;
    }


    const mode = tab === "personal"
        ? "personal"
        : "family";

    const visibleTasks = useMemo(() =>
        tab === "personal"
            ? (tasks ?? []).filter(t => t.assigned_to === user.id)
            : (tasks ?? []),
        [tab, tasks, user.id]
    );

    const taskProgress = useMemo(() =>
        tab === "family"
            ? getFamilyTaskProgress(tasks ?? [], date)
            : getUserTaskProgress(tasks ?? [], user.id, date),
        [tab, tasks, date, user.id]
    );
    return (
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Header */}
            <section className="lg:col-span-12 rounded-xl p-4">
                <DashboardHeader />
            </section>


            {/* Left content */}
            <section className="lg:col-span-8 space-y-6">

                <div className="lg:hidden ">
                    <SmallCalendar
                        date={date}
                        setDate={setDate}
                    />
                </div>

                <div className="lg:hidden">
                    <ToggleGroup
                        active={tab}
                        onChange={setTab}
                        items={taskTabs}
                    />
                </div>

                {isTasksLoading ? (
                    <LevelCardSkeleton />
                ) : (
                    <TaskProgress
                        mode={mode}
                        completed={taskProgress.completed}
                        total={taskProgress.total}
                    />
                )}

                {isTasksLoading ? (
                    <TasksSkeleton />
                ) : (
                    <MyTasks
                        date={date}
                        items={visibleTasks}
                    />
                )}

                {/* Mobile only */}
                <div className="lg:hidden">
                    <FamilyProgress
                        familyId={family.family_id}
                        tasks={tasks ?? []}
                        date={date}
                    />
                </div>

            </section>


            {/* Sidebar */}
            <aside className="hidden lg:flex lg:col-span-4 flex-col gap-6">

                <SmallCalendar
                    date={date}
                    setDate={setDate}
                />

                <FamilyProgress
                    familyId={family.family_id}
                    tasks={tasks ?? []}
                    date={date}
                />

            </aside>

        </Container>
    )
}