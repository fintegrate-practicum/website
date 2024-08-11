import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import task from '../classes/task';
import { UpdateTaskEmployeeDTO } from '../dto/updateTaskEmployeeDto';
import { UpdateTaskManagerDTO } from '../dto/updateTaskManagerDto';
import { RootState } from '../../../Redux/store';
import workerInstance from '../../../auth0/WorkersInterceptors';

interface EditTaskArgs {
  taskId: string;
  updateTask: UpdateTaskManagerDTO | UpdateTaskEmployeeDTO;
  employeeType: string;
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (managerId, businessId) => {
    const response = await workerInstance.get(
      `/tasks/manager/${businessId}/${managerId}`,
    );
    return response.data;
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [] as task[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      });
  },
});

export const selectTasks = (state: RootState) => state.taskSlice.tasks;
// export const selectTaskById = (state: RootState, id: Types.ObjectId) =>
//   state.taskSlice.tasks.find((task: task) => task._id.equals(id));

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
