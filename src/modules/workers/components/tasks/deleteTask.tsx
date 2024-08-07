import Button from '../../../../common/components/Button/Button';
import { deleteTask } from '../../features/taskSlice';
import { useAppDispatch } from '../../../../Redux/hooks';
import {useTranslation} from 'react-i18next'
const DeleteTask = (props: {
  taskId: string;
}) => {
const {t}=useTranslation();
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(props.taskId));
  };
  return (
    <Button variant='outlined' onClick={handleDelete} >
      {t("Delete")}
    </Button>  
  );
};

export default DeleteTask;
