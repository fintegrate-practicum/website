import { Types } from 'mongoose';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';
import { selectTaskById } from '../../features/taskSlice';

const SingleTask: React.FC<{ item: any }> = ({ item }) => {
    const taskId = item._id; 
    const taskObjectId = Types.ObjectId.createFromHexString(taskId);
    const task = useSelector((state: RootState) => selectTaskById(state, taskObjectId));

    if (!task) {
        return <div>No task found</div>;
    }

    const employees = task.employee.map((e: Types.ObjectId) => e.toString()).join(', ');

    return (
        <div className="task-details">
            <h2>{task.taskName}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Target Date: {new Date(task.targetDate).toLocaleDateString()}</p>
            <p>Assigned to: {employees}</p>
            <p>Urgency: {task.urgency}</p>
            <p>Completion Date: {task.completionDate ? new Date(task.completionDate).toLocaleDateString() : 'Not completed yet'}</p>
        </div>
    );
};

export default SingleTask;
