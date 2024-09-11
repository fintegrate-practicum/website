import React, { useEffect, useMemo } from 'react';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';
import TableComponent from '../../../../common/components/Table/TableComponent';
import { DataObject } from '../../../../common/components/Table/interfaces';
import { useTranslation } from 'react-i18next';
import AddTaskBtn from './createTaskBtn';

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
  const dateFormate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newDate = `${formattedDate} ${formattedTime}`;
    return newDate;
  };
  const { t } = useTranslation();
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
      filteredTasks.map((task, index) => {
        const targetDate =
          task.targetDate instanceof Date
            ? task.targetDate
            : new Date(task.targetDate);

        return {
          id: index,
          taskName: task.taskName,
          targetDate: dateFormate(targetDate),
          urgency: task.urgency,
        };
      }),
    [filteredTasks],
  );
  const dataObject: DataObject = {
    headers: [
      { key: 'taskName', label: t('common.Task Name'), type: 'text' },
      { key: 'targetDate', label: t('common.Target Date'), type: 'text' },
      { key: 'urgency', label: t('common.Urgency'), type: 'text' },
    ],
    rows,
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableComponent
          dataObject={dataObject}
          tableSize='large'
          showDeleteButton={false}
        />
      </div>
      <AddTaskBtn />
    </>
  );
};
export default TasksShowList;
