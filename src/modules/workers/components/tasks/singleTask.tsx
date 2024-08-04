import { useParams } from 'react-router-dom';
import { selectTaskById } from '../../features/taskSlice';
import { Types } from 'mongoose';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';

const SingleTask = () => {
    const { taskId } = useParams<{ taskId: string }>();  
    const taskObjectId = new Types.ObjectId(taskId);
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
