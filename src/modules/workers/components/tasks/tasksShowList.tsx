import React, { useEffect, useMemo, useState } from 'react';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';
import TableComponent from '../../../../common/components/Table/TableComponent';
import { DataObject } from '../../../../common/components/Table/interfaces';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import SingleTask from './singleTask';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpen = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

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
      { key: 'taskName', label: t('common.Task Name'), type: 'text' },
      { key: 'targetDate', label: t('common.Target Date'), type: 'text' },
      { key: 'urgency', label: t('common.Urgency'), type: 'text' },
    ],
    rows,
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* Creating Table */}
      <TableComponent
        dataObject={dataObject}
        tableSize='large'
        showDeleteButton={false}
      />

      {/* Creating rows with onClick */}
      {filteredTasks.map((task, index) => (
        <TableRow key={index} onClick={() => handleOpen(task)}>
          <TableCell>{task.taskName}</TableCell>
          <TableCell>{task.targetDate.toISOString()}</TableCell>
          <TableCell>{task.urgency}</TableCell>
        </TableRow>
      ))}

      {/* Dialog for displaying the selected task */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        {selectedTask && <SingleTask item={selectedTask} />}
      </Dialog>
    </div>
  );
};

export default TasksShowList;
