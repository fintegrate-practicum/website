import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import task from '../classes/task';
import { UpdateTaskEmployeeDTO } from '../dto/updateTaskEmployeeDto';
import { UpdateTaskManagerDTO } from '../dto/updateTaskManagerDto';
import { RootState } from '../../../Redux/store';
import workerInstance from '../../../auth0/WorkersInterceptors';
import Task from '../classes/task';

interface EditTaskArgs {
  taskId: string;
  updateTask: UpdateTaskManagerDTO | UpdateTaskEmployeeDTO;
  employeeType: string;
}
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

interface FetchTasksArgs {
  businessId: string;
  employeeId: string;
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ businessId, employeeId }: FetchTasksArgs) => {
    const response = await workerInstance.get(
      `/tasks/employee/${businessId}/${employeeId}`,
    );
    return response.data.data;
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      },
    );
  },
});

export const selectTasks = (state: RootState) => state.taskSlice.tasks;
export default taskSlice.reducer;

export const createTask = createAsyncThunk('', async (_task: task) => {
  try {
    const response = await workerInstance.post(`/tasks/manager/task`, _task);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const editTask = createAsyncThunk(
  '',
  async ({ taskId, updateTask, employeeType }: EditTaskArgs) => {
    try {
      const response = await workerInstance.put(
        `/tasks/task/${taskId}`,
        updateTask,
        {
          headers: {
            'employee-type': employeeType,
          },
        },
      );

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const deleteTask = createAsyncThunk('', async (taskId: string) => {
  try {
    const response = await workerInstance.delete(
      `/tasks/manager/task/${taskId}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
