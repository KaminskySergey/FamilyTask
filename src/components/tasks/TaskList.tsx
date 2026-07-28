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

        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">


            <table className="w-full">

                <thead className="border-b border-border bg-background-white">

                    <tr className="text-sm font-bold text-muted">

                        <th className="px-6 py-5 text-left">
                            Task
                        </th>

                        <th>
                            Category
                        </th>

                        <th>
                            Assignee
                        </th>

                        <th>
                            Deadline
                        </th>

                        <th>
                            Priority
                        </th>

                        <th>
                            Repeat
                        </th>

                    </tr>

                </thead>


                <tbody className="divide-y divide-border">


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