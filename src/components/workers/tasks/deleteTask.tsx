import React from 'react';
import Button from '@mui/material/Button';
import { deleteTask } from '../../../Redux/taskSlice';
import { useAppDispatch } from '../../../Redux/hooks';

const DeleteTask = (props: {
  taskId: string;
}) => {

  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(props.taskId));
  };
  return (
    <Button variant="outlined"  onClick={handleDelete}>
      Delete
    </Button>  
  );
};

export default DeleteTask;
