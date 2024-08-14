import React, { useEffect } from 'react';
import GenericList from '../../../../components/generic/genericList';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';

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
<<<<<<< HEAD
      currentUser.role.type !== 'manager' &&
=======
      currentUser.role.type !== 'admin' &&
>>>>>>> 2d1217ef6d453224ffb34f800a099a4a0a002c18
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
<<<<<<< HEAD
          title={'tasks list'}
          list={filteredTasks}
          column={['taskName', 'targetDate', 'theUrgencyOfTheTask']}
=======
          title={'רשימת משימות'}
          list={filteredTasks}
          column={[
            { name: 'taskName', header: 'שם המשימה', type: 'text' },
            { name: 'targetDate', header: 'תאריך יעד', type: 'date' },
            { name: 'urgency', header: 'דחיפות', type: 'text' },
          ]}
>>>>>>> 2d1217ef6d453224ffb34f800a099a4a0a002c18
          desing={null}
        />
      </div>
    </>
  );
};

export default TasksShowList;
