import React, { useEffect } from "react";
import GenericList from "../../../../components/generic/genericList";
import Task from "../../classes/task";
import { useAppSelector } from "../../../../Redux/hooks";

interface ShowTaskListProps {
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksShowList: React.FC<ShowTaskListProps> = ({ filteredTasks, setFilteredTasks }) => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser.employeeDetails); 

  useEffect(() => {
    if (currentUser.role.type !== 'manager' && filteredTasks && filteredTasks.length > 0) {
      const updatedFilteredTasks = filteredTasks.filter((task) => {
        return task.employee.some((emp) => String(emp) === currentUser.id_user);
      });
      setFilteredTasks(updatedFilteredTasks);
    }
  }, [currentUser, filteredTasks, setFilteredTasks]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <GenericList
          title={"tasks list"}
          list={filteredTasks}
          column={["taskName", "targetDate", "theUrgencyOfTheTask"]}
          desing={null}
        />
      </div>
    </>
  );
};

export default TasksShowList;

