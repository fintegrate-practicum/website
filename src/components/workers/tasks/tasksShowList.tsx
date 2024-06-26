import React, { useEffect, useState } from "react";
import GenericList from "../../generic/genericList";
import { EmployeeRole } from "../../../classes/enum/employeeRole.enum";
import Task from "../../../classes/task";
import employee from "../../../classes/employee";
import { Types } from "mongoose";
interface ShowTaskListProps {
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksShowList: React.FC<ShowTaskListProps> = ({ filteredTasks, setFilteredTasks }) => {

  const newEmployee: employee = {
    _id: new Types.ObjectId("664cba7ee786ab5c121aa40b"),
    businessId: new Types.ObjectId("664cba7ee786ab5c121aa40b"),
    code: "EMP123",
    createdBy: "adminUserId",
    updatedBy: "adminUserId",
    role: new EmployeeRole("cleaner", true, "clean room"),
    nameEmployee: ""
  };

  useEffect(() => {
    if (newEmployee.role.type !== 'manager') {
      const updatedFilteredTasks = filteredTasks.filter((task) => {
        return task.employee.filter((emp) => {
          return emp === newEmployee._id;
        });
      });
      setFilteredTasks(updatedFilteredTasks);
    }
  }, [newEmployee, filteredTasks]);

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
