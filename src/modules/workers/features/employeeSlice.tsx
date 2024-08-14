import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/store';
import employee from '../classes/employee';
import workerInstance from '../../../auth0/WorkersInterceptors';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (businessId) => {
    const response = await workerInstance.get(
      `/workers?businessId=${businessId}`,
    );
    return response.data;
  },
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [] as employee[],
    status: 'idle',
    error: null as string | null,
    currentEmployee: null as employee | null,
  },
  reducers: {},
});

export const selectEmployees = (state: RootState) =>
  state.employeeSlice.employees;
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
  try {
    const response = await workerInstance.post(`/workers`, _employee);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
  try {
    const response = await workerInstance.delete(`/workers/${_num}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const editEmployee = createAsyncThunk(
  '',
  async (_employee: employee) => {
    try {
      const response = await workerInstance.put(
        `/workers/${_employee.userId}`,
        _employee,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const getUserById = createAsyncThunk('', async (id: string) => {
  try {
    const response = await workerInstance.get(`/user/${id}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
});
