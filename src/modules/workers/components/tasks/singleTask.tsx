import { Types } from 'mongoose';
import Task from '../../classes/task';
import { useTranslation } from 'react-i18next';
import React from 'react';
import workerInstance from '../../../../auth0/WorkersInterceptors';

const SingleTask: React.FC<{ item: object }> = ({ item }) => {
  const { t } = useTranslation();
  const task = item as Task;

  if (!task) {
    return <div>No task found</div>;
  }

  const fetchEmployeeNames = async () => {
    try {
      const employeeNames = await Promise.all(
        task.employee.map(async (employeeId: Types.ObjectId) => {
          const response = await workerInstance.get(
            `/workers/employee/${employeeId}`,
          );
          return response.data.nameEmployee;
        }),
      );
      return employeeNames.join(', ');
    } catch (error) {
      console.error('Error fetching employee names:', error);
      return t('unknown_employee');
    }
  };

  const [employeeNames, setEmployeeNames] = React.useState<string>('');

  React.useEffect(() => {
    fetchEmployeeNames().then(setEmployeeNames);
  }, [task.employee]);

  return (
    <div className='task-details'>
      <h2>{task.taskName}</h2>
      <p>
        {t('description')}:{task.description}
      </p>
      <p>
        {t('status')}: {task.status}
      </p>
      <p>
        {t('target_date')}: {new Date(task.targetDate).toLocaleDateString()}
      </p>
      <p>
        {t('assigned_to')}: {employeeNames}
      </p>
      <p>
        {t('urgency')}: {task.urgency}
      </p>
      <p>
        {t('completion_date')}:{' '}
        {task.completionDate
          ? new Date(task.completionDate).toLocaleDateString()
          : t('not_completed_yet')}
      </p>
    </div>
  );
};

export default SingleTask;
