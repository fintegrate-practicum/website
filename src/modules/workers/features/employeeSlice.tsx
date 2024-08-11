import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/store';

import axios from 'axios';
import employee from '../classes/employee';

const baseUrl = import.meta.env.VITE_WORKERS_SERVICE_URL;
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (businessId) => {
    const response = await axios.get(
      `${baseUrl}/workers?businessId=${businessId}`,
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
  },
  reducers: {},
});

// export const {} = employeeSlice.actions;
export const selectEmployees = (state: RootState) =>
  state.employeeSlice.employees;
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
  try {
    const response = await axios.post(`${baseUrl}/workers`, _employee);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/workers/${_num}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const editEmployee = createAsyncThunk(
  '',
  async (_employee: employee) => {
    try {
      const response = await axios.put(
        `${baseUrl}/workers/${_employee.userId}`,
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
    const response = await axios.get(`${baseUrl}/user/${id}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
});
