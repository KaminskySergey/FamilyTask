import type { ITask } from "@/types/task";
import { TaskRow } from "./TaskRow";

interface ITasksList {
    tasks: ITask[];
    loading?: boolean;
}


export function TasksList({
    tasks,
    loading
}: ITasksList) {


    if (loading) {
        return (
            <div className="rounded-3xl bg-white p-8">
                Loading...
            </div>
        )
    }


    if (!tasks.length) {
        return (
            <div className="rounded-3xl bg-white p-8 text-center text-muted">
                No tasks found
            </div>
        )
    }



    return (

        <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-sm">
            <table className="w-full divide-y divide-border">
                <thead className="bg-background-white">
                    <tr className="h4 text-muted">
                        <th className="px-6 py-5 text-left">
                            Task
                        </th>

                        <th className="px-6 py-5 text-left">
                            Description
                        </th>

                        <th className="px-6 py-5 text-left">
                            Category
                        </th>

                        <th className="px-6 py-5 text-left">
                            Assignee
                        </th>

                        <th className="px-6 py-5 text-left">
                            Deadline
                        </th>

                        <th className="px-6 py-5 text-left">
                            Repeat
                        </th>

                        <th className="px-6 py-5 text-left">
                            Priority
                        </th>

                        <th className="px-6 py-5 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-border bg-white">
                    {tasks.map(task => (
                        <TaskRow
                            key={task.id}
                            task={task}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}