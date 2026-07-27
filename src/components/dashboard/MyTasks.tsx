import type { ITask } from "../../types/task";
import { Box } from "../ui/Box";
import { TaskCard } from "./TaskCard";
import { EmptyTasks } from "../ui/EmptyTask";

interface IMyTasks {
    items: ITask[]
    date: string
}

export function MyTasks({ items, date }: IMyTasks) {
    return (
        <Box>
            <h2 className="h2 mb-5">Daily Plan</h2>
            {items.length !== 0 ? <ul className="flex flex-col gap-3">
                {
                    items.map((el) => (
                        <TaskCard key={el.id} selectedDate={date} task={el} />
                    ))
                }
            </ul>
                : <EmptyTasks />
            }

        </Box>
    )
}