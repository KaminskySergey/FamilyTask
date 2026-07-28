import type { ITask } from "@/types/task";

interface ITaskRow {
    task: ITask;
}


export function TaskRow({
    task
}: ITaskRow) {


    return (

        <tr className="hover:bg-light-blue/40 transition">


            <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                        {/* {task.icon} */}
                    </div>


                    <div>

                        <p className="font-bold text-text">
                            {task.title}
                        </p>


                        <p className="text-sm text-muted">
                            {task.description}
                        </p>

                    </div>


                </div>

            </td>


            <td>
                {task.category}
            </td>


            <td>

                <div className="flex -space-x-2">

                    {/* {task.users.map(user => (

                        <img
                            key={user.id}
                            src={user.avatar}
                            className="h-8 w-8 rounded-full border-2 border-white"
                        />

                    ))} */}

                </div>

            </td>


            <td>

                <p className="font-semibold">
                    {task.deadline}
                </p>

            </td>


            <td>
                {task.priority}
            </td>


            <td>
                {task.recurrence}
            </td>


        </tr>

    )
}