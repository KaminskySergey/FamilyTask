import { FiltersTasks } from "@/components/tasks/FiltersTasks";
import { TabsTasks } from "../../components/tasks/TabsTasks";
import { Container } from "../../components/ui/Container";
import type { TaskFilters } from "@/types/task";
import { Navigate, useSearchParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentFamily } from "@/hooks/queries/useFamily";
import { Loader } from "@/components/ui/Loader";
import { useTasks } from "@/hooks/queries/useTasks";
import { TasksList } from "@/components/tasks/TaskList";


export default function TasksPage() {
    const { user } = useAuth();
    const { data: family, isLoading: isFamilyLoading } = useCurrentFamily(user?.id);
    const [searchParams] = useSearchParams();

    const filters: TaskFilters = {
        familyId: family?.family_id,
        userId: user?.id,
        date: searchParams.get("date") ?? undefined,
        tab: (searchParams.get("tab") as TaskFilters["tab"]) ?? "open",
        priority: searchParams.get("priority") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        recurrence: searchParams.get("recurrence") ?? undefined,
    };

    const { data: tasks, isLoading: isLoadingTask } = useTasks(filters);

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (isFamilyLoading) {
        return <Loader />;
    }
    if (!family) {
        return <Navigate to="/setup" replace />;
    }
    console.log(tasks)
    return (
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-12">
                <div className="flex flex-col w-full">
                    <h1 className="h1 mb-3">Tasks</h1>
                    <TabsTasks />
                </div>

            </section>
            <section className="lg:col-span-12">
                <FiltersTasks />
            </section>
            <section className="lg:col-span-12">
                 <TasksList tasks={tasks} loading={isLoadingTask}/>
            </section>
        </Container>
    )
}