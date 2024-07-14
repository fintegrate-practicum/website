import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { UpdateTaskEmployeeDTO } from "../../dto/updateTaskEmployeeDto";
import { editTask } from "../../features/taskSlice";
import { UpdateTaskManagerDTO } from "../../dto/updateTaskManagerDto";
import { TaskStatus } from "../../classes/enum/taskStatus.enum";

const EditTask = (props: {
  status: TaskStatus;
  taskId: string;
  description: string;
  taskName: string;
  targetDate: Date;
  employee: string[];
}) => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser.employeeDetails);  
  React.useEffect(() => {

  }, [currentUser]);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState(props.taskId);
  const [description, setDescription] = React.useState(props.description);
  const [status, setStatus] = React.useState(props.status);
  const [taskName, setTaskName] = React.useState(props.taskName);
  const [targetDate, setTargetDate] = React.useState(
    props.targetDate.toISOString().split("T")[0]
  );
  const [employee, setEmployee] = React.useState(props.employee);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as unknown as TaskStatus);
  };

  const handleClickOpen=() => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const employeeArray = value.split(",").map((item) => item.trim());
    setEmployee(employeeArray);
  };

  return (    
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        edit task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (currentUser.role.type !=='manager'||'admin'){
              const updateTaskForEmployee: UpdateTaskEmployeeDTO = {
                description: description,
                status: status,
              };
              dispatch(    
                editTask({ taskId, updateTask: updateTaskForEmployee,employeeType:'employee' })
              );
            } else {
              const updateTaskForManager: UpdateTaskManagerDTO = {
                description: description,
                taskName: taskName,
                status: status,
                targetDate: new Date(targetDate),
                employee: employee,
              }
              dispatch(
                editTask({ taskId, updateTask: updateTaskForManager ,employeeType:'manager'})
              );
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>edit task</DialogTitle>
        <DialogContent>
          {currentUser.role.type == 'manager' && (
            <>
              <br />
              <TextField
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
                required
                margin="dense"
                id="taskName"
                name="taskName"
                label="task name"
                type="text"
                fullWidth
                variant="standard"
              />
              <br />
              <TextField
                onChange={(e) => setTargetDate(e.target.value)}
                value={targetDate}
                required
                margin="dense"
                id="targetDate"
                name="targetDate"
                label="target date"
                type="date"
                fullWidth
                variant="standard"
              />
              <TextField
                onChange={handleEmployeeChange}
                value={employee.join(", ")}
                autoFocus
                // required
                margin="dense"
                id="employee"
                name="employee"
                label="Employee"
                type="text"
                fullWidth
                variant="standard"
              />
            </>
          )}
          <br />
          <br />
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status.toString()}
                label="status"
                onChange={handleChange}
              >
                <MenuItem value={TaskStatus.ToDo}>ToDo</MenuItem>
                <MenuItem value={TaskStatus.InProgress}>InProgress</MenuItem>
                <MenuItem value={TaskStatus.Completed}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="description task"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default EditTask;
