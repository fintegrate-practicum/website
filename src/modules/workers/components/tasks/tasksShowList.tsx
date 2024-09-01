import React, { useEffect, useMemo } from 'react';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';
import TableComponent from '../../../../stories/TableComponent';
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
  const dataObject = useMemo(() => {
    return {
      headers: [
        { key: 'taskName', label: 'taskName', type: 'text' },
        { key: 'targetDate', label: 'targetDate', type: 'text' },
        { key: 'urgency', label: 'theUrgency Of The Task', type: 'text' },
      ],
      rows: filteredTasks.map((task) => ({
        id: task.id,
        taskName: task.taskName,
        targetDate: task.targetDate.toISOString(), // Convert Date to string
        urgency: task.urgency,
      })),
    };
  }, [filteredTasks]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TableComponent
        dataObject={dataObject}
        tableSize='large'
        onDelete={() => {}}
        showDeleteButton={false}
        handleAmountChange={() => {}}
      />
    </div>
  );
};
export default TasksShowList;
