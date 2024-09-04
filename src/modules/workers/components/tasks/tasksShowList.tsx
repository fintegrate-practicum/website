import React, { useEffect, useMemo } from 'react';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';
import TableComponent from '../../../../common/components/Table/TableComponent';
import { DataObject } from '../../../../common/components/Table/interfaces';
interface ShowTaskListProps {
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TasksShowList: React.FC<ShowTaskListProps> = ({
  filteredTasks,
  setFilteredTasks,
}) => {
  const currentUser = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );
  useEffect(() => {
    if (
      currentUser.role.type !== 'admin' &&
      filteredTasks &&
      filteredTasks.length > 0
    ) {
      const updatedFilteredTasks = filteredTasks.filter((task) => {
        return task.employee.some((emp) => String(emp) === currentUser.id_user);
      });
      setFilteredTasks(updatedFilteredTasks);
    }
  }, [currentUser, filteredTasks, setFilteredTasks]);

  const rows = useMemo(
    () =>
      filteredTasks.map((task) => ({
        taskName: task.taskName,
        targetDate: task.targetDate.toISOString(),
        urgency: task.urgency,
      })),
    [filteredTasks],
  );

  const dataObject: DataObject = {
    headers: [
      { key: 'taskName', label: 'Task Name', type: 'text' },
      { key: 'targetDate', label: 'Target Date', type: 'text' },
      { key: 'urgency', label: 'Urgency', type: 'text' },
    ],
    rows,
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TableComponent
        dataObject={dataObject}
        tableSize='large'
        showDeleteButton={false}
      />
    </div>
  );
};
export default TasksShowList;
