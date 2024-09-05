import * as React from 'react';
import Button from '../../../../common/components/Button/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTask } from '../../features/taskSlice';
import { useAppDispatch } from '../../../../Redux/hooks';
import { Types } from 'mongoose';
import Task from '../../classes/task';
import { TaskStatus } from '../../classes/enum/taskStatus.enum';
import { useTranslation } from 'react-i18next';

export default function AddTaskBtn() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const businessId = new Types.ObjectId(import.meta.env.VITE_BUSINESSID);
  const managerId = import.meta.env.VITE_MANAGERID
    ? import.meta.env.VITE_MANAGERID
    : 'companyName';
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [targetDate, setTargetDate] = React.useState(new Date(0));
  const [employee, setEmployee] = React.useState<Types.ObjectId[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);

  const [urgency, setUrgency] = React.useState(0);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const task: Task = {
      businessId,
      managerId,
      taskName,
      description,
      targetDate,
      employee,
      tags,
      urgency,
      status: TaskStatus.ToDo,
      completionDate: new Date(0),
      directLink: 'http://localhost:4001/api#/Workers/WorkersController_create',
    };
    dispatch(createTask(task));
    setOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(new Date(e.target.value));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const employeeArray = value
      .split(',')
      .map((item) => {
        const trimmed = item.trim();
        if (Types.ObjectId.isValid(trimmed)) {
          return new Types.ObjectId(trimmed);
        }
        console.warn(`Invalid ObjectId: ${trimmed}`);
        return null;
      })
      .filter((item) => item !== null) as Types.ObjectId[];

    setEmployee(employeeArray);
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagsArray = value
      .split(',')
      .map((item) => {
        const trimmed = item.trim();
        console.warn(`Invalid ObjectId: ${trimmed}`);
        return null;
      })
      .filter((item) => item !== null) as string[];

    setTags(tagsArray);
  };
  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        {t('workers.Add new Task')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>{t('workers.Add new Task')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              'workers.To add a new task, please enter the data here. We will send updates to employees.',
            )}
          </DialogContentText>
          <TextField
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
            required
            margin='dense'
            id='task_name'
            name='task_name'
            label={t('workers.Task Name')}
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            required
            margin='dense'
            id='description'
            name='description'
            label={t('workers.Description')}
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            onChange={handleDateChange}
            value={targetDate.toISOString().split('T')[0]}
            autoFocus
            required
            margin='dense'
            id='target_date'
            name='Target Date'
            label={t('workers.Target Date')}
            type='date'
            fullWidth
            variant='standard'
          />
          <TextField
            onChange={handleEmployeeChange}
            value={employee.join(', ')}
            autoFocus
            margin='dense'
            id='employee'
            name='employee'
            label={t('workers.Employee')}
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            onChange={handleTagsChange}
            value={tags.join(', ')}
            autoFocus
            margin='dense'
            id='tags'
            name='tags'
            label={t('workers.Tags')}
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            onChange={(e) => setUrgency(parseInt(e.target.value))}
            autoFocus
            required
            margin='dense'
            id='urgency'
            name='Urgency'
            label={t('workers.Urgency')}
            type='number'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.Cancel')}</Button>
          <Button type='submit'>{t('common.Save')}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
