import { useState } from 'react';
import SearchTask from "./searchTask";
import Task from "../../classes/task";
import TasksShowList from "./tasksShowList";
import { useAppSelector } from "../../../../Redux/hooks";

const TaskPage = () => {
    const tasks = useAppSelector((state) => state.taskSlice);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    return (
        <div>
            <SearchTask tasks={tasks} setFilteredTasks={setFilteredTasks} />
            <TasksShowList filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />
        </div>
    );
};
export default TaskPage;
