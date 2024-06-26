import React, { useEffect } from "react";
import GenericList from "../../generic/genericList";

import Task from "../../../classes/task";
import { useAppSelector } from "../../../Redux/hooks";
interface ShowTaskListProps {
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksShowList: React.FC<ShowTaskListProps> = ({ filteredTasks, setFilteredTasks }) => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser.employeeDetails);  
  useEffect(() => {
    if (currentUser.role.type !== 'manager') {
      const updatedFilteredTasks = filteredTasks.filter((task) => {
        return task.employee.filter((emp) => {
          return emp === currentUser.id_user;
        });
      });
      setFilteredTasks(updatedFilteredTasks);
    }
  }, [currentUser, filteredTasks]);

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
