import { FiltersTasks } from "@/components/tasks/FiltersTasks";
import { TabsTasks } from "../../components/tasks/TabsTasks";
import { Container } from "../../components/ui/Container";


export function TasksPage() {
    return (
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-12">
                <div className="flex flex-col w-full">
                    <h1 className="h1 mb-3">Tasks</h1>
                    <TabsTasks />
                </div>

            </section>
            <section>
                <FiltersTasks />
            </section>
        </Container>
    )
}