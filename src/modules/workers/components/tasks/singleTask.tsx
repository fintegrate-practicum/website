import { Types } from 'mongoose';
import Task from '../../classes/task';

/* eslint-disable-next-line react/prop-types */
const SingleTask: React.FC<{ item: object }> = ({ item }) => {
  const task = item as Task;

  if (!task) {
    return <div>No task found</div>;
  }

  const employees = task.employee
    .map((e: Types.ObjectId) => e.toString())
    .join(', ');

  return (
    <div className='task-details'>
      <h2>{task.taskName}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Target Date: {new Date(task.targetDate).toLocaleDateString()}</p>
      <p>Assigned to: {employees}</p>
      <p>Urgency: {task.urgency}</p>
      <p>
        Completion Date:{' '}
        {task.completionDate
          ? new Date(task.completionDate).toLocaleDateString()
          : 'Not completed yet'}
      </p>
    </div>
  );
};

export default SingleTask;
