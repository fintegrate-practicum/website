import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";
import workerInstance from '../../../auth0/WorkersInterceptors'
import axios from "axios";
import employee from "../classes/employee";

const businessId = import.meta.env.VITE_BUSINESSID;
const res = await axios.get(`${workerInstance}/workers?businessId=${businessId}`);
const { data = {} } = res.data;

const employeeSlice = createSlice({
    name: "employees",
    initialState: data,
    reducers: {}
})

export const { } = employeeSlice.actions;
export const selectEmployees = (state :RootState) => state.employeeSlice.employees
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.post(`${workerInstance}/workers`, _employee);
        return response.data
    } catch (error) {
        return error
    }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
    try {
        const response = await axios.delete(`${workerInstance}/workers/${_num}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.put(`${workerInstance}/workers/${_employee.userId}`, _employee)
        return response.data
    } catch (error) {
        return error
    }
});