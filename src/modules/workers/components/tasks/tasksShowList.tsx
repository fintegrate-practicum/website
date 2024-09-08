import React, { useEffect, useMemo } from 'react';
import Task from '../../classes/task';
import { useAppSelector } from '../../../../Redux/hooks';
import TableComponent from '../../../../common/components/Table/TableComponent';
import { DataObject } from '../../../../common/components/Table/interfaces';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import Button from '../../../../common/components/Button/Button';
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
  const exportToExcel = () => {
    const data = dataObject.rows.map((item) => ({
      taskName: item.taskName,
      targetDate: item.targetDate,
      urgency: item.urgency,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    const desiredColumnWidths = [
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];
    worksheet['!cols'] = desiredColumnWidths;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'MYSavedData.xlsx');
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
      <Button onClick={exportToExcel} variant='outlined'>
        Export to Excel
      </Button>
    </>
  );
};
export default TasksShowList;
