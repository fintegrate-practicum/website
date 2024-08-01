

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfraInterceptors from '../../../../auth0/InfraInterceptors';
import { CircularProgress } from '@mui/material';
import Task from '../../classes/task';

const SingleTask = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {

        const fetchTask = async () => {
            try {
                const response = await InfraInterceptors.get(`/tasks/${taskId}`);
                setTask(response.data);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };
                fetchTask();
    }, [taskId]);

       if (loading) {
        return <div><CircularProgress /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!task) {
        return <div>No task found</div>;
    }

    return (
        <div className="task-details">
            <h2>{task.taskName}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Target Date: {new Date(task.targetDate).toLocaleDateString()}</p>
            <p>Assigned to: {task.employee.map(e => e.toString()).join(', ')}</p>
            <p>Urgency: {task.urgency}</p>
            <p>Completion Date: {task.completionDate ? new Date(task.completionDate).toLocaleDateString() : 'Not completed yet'}</p>
        </div>
    );
    };

export default SingleTask;
