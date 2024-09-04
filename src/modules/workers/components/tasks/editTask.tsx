import * as React from 'react';
import TextField from '../../../../common/component/TextField/TextField';
import Button from '../../../../common/components/Button/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
import { UpdateTaskEmployeeDTO } from '../../dto/updateTaskEmployeeDto';
import { editTask } from '../../features/taskSlice';
import { UpdateTaskManagerDTO } from '../../dto/updateTaskManagerDto';
import { TaskStatus } from '../../classes/enum/taskStatus.enum';
import { useTranslation } from 'react-i18next';
const EditTask = (props: {
  status: TaskStatus;
  taskId: string;
  description: string;
  taskName: string;
  targetDate: Date;
  employee: string[];
  tags: string[];
}) => {
  const { t } = useTranslation();
  const currentUser = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );
  React.useEffect(() => {}, [currentUser]);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [taskId] = React.useState(props.taskId);
  const [description, setDescription] = React.useState(props.description);
  const [status, setStatus] = React.useState(props.status);
  const [tags, setTags] = React.useState(props.tags);

  const [taskName, setTaskName] = React.useState(props.taskName);
  const [targetDate, setTargetDate] = React.useState(
    props.targetDate.toISOString().split('T')[0],
  );
  const [employee, setEmployee] = React.useState(props.employee);
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as unknown as TaskStatus);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const employeeArray = value.split(',').map((item) => item.trim());
    setEmployee(employeeArray);
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagsArray = value.split(',').map((item) => item.trim());
    setTags(tagsArray);
  };
  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        {t('workers.editTask')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (currentUser.role.type !== 'manager') {
              const updateTaskForEmployee: UpdateTaskEmployeeDTO = {
                description: description,
                status: status,
              };
              dispatch(
                editTask({
                  taskId,
                  updateTask: updateTaskForEmployee,
                  employeeType: 'employee',
                }),
              );
            } else {
              const updateTaskForManager: UpdateTaskManagerDTO = {
                description: description,
                taskName: taskName,
                status: status,
                targetDate: new Date(targetDate),
                employee: employee,
              };
              dispatch(
                editTask({
                  taskId,
                  updateTask: updateTaskForManager,
                  employeeType: 'manager',
                }),
              );
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>{t('workers.editTask')}</DialogTitle>
        <DialogContent>
          {currentUser.role.type === 'manager' && (
            <>
              <br />
              <TextField
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
                required
                margin='dense'
                id='taskName'
                name='taskName'
                label={t('workers.taskName')}
                type='text'
                fullWidth
                variant='standard'
              />
              <br />
              <TextField
                onChange={(e) => setTargetDate(e.target.value)}
                value={targetDate}
                required
                margin='dense'
                id='targetDate'
                name='targetDate'
                label={t('workers.targetDate')}
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
                label={t('workers.employee')}
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
                label={'workers.tags'}
                type='text'
                fullWidth
                variant='standard'
              />
            </>
          )}
          <br />
          <br />
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {t('workers.status')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={status.toString()}
                label={t('workers.status')}
                onChange={handleChange}
              >
                <MenuItem value={TaskStatus.ToDo}>
                  {t('workers.statusToDo')}
                </MenuItem>
                <MenuItem value={TaskStatus.InProgress}>
                  {t('workers.statusInProgress')}
                </MenuItem>
                <MenuItem value={TaskStatus.Completed}>
                  {t('workers.statusCompleted')}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          <TextField
            autoFocus
            required
            margin='dense'
            id='description'
            name='description'
            label={t('workers.description')}
            type='text'
            fullWidth
            variant='standard'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.Cancel')}</Button>
          <Button type='submit'>{t('common.Save')}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default EditTask;
