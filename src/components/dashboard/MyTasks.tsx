import type { ITask } from "../../types/task";
import { Box } from "../ui/Box";
import { TaskCard } from "./TaskCard";

interface IMyTasks {
    items: ITask[]
    date: string
}

export function MyTasks({ items, date }: IMyTasks) {
    return (
        <Box>
            <h2 className="h2 mb-5">Daily Plan</h2>
            <ul className="flex flex-col gap-3">
                {
                    items.map((el) => (
                        <TaskCard selectedDate={date} task={el}/>
                    ))
                }
            </ul>
        </Box>
    )
}