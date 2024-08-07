import React, { useEffect } from "react";
import GenericList from "../../../../components/generic/genericList";
import Task from "../../classes/task";
import { useAppSelector } from "../../../../Redux/hooks";
import { useTranslation } from 'react-i18next';

interface ShowTaskListProps {
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksShowList: React.FC<ShowTaskListProps> = ({ filteredTasks, setFilteredTasks }) => {
  const { t } = useTranslation();
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
          title={t('tasks list')}
          list={filteredTasks}
          column={[t('Task Name'), t('Target Date'), t('theUrgencyOfTheTask')]}
          desing={null}
        />
      </div>
    </>
  );
};

export default TasksShowList;
