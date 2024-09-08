import React, { useEffect } from 'react';
import GenericList from '../../../../components/generic/genericList';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';
import SingleTask from './singleTask';

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

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <GenericList
          title={'רשימת משימות'}
          list={filteredTasks}
          column={[
            { name: 'taskName', header: 'שם המשימה', type: 'text' },
            { name: 'targetDate', header: 'תאריך יעד', type: 'date' },
            { name: 'urgency', header: 'דחיפות', type: 'text' },
          ]}
          desing={null}
          DialogComponent={SingleTask}
        />
      </div>
    </>
  );
};

export default TasksShowList;
