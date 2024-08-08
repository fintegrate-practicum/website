import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import axios from "axios";
import employee from "../classes/employee";
import workerInstance from "../../../auth0/WorkersInterceptors";

const baseUrl = import.meta.env.VITE_WORKERS_SERVICE_URL;
const businessId = import.meta.env.VITE_BUSINESSID;
const res = await workerInstance.get(`/workers?businessId=${businessId}`);
const { data = {} } = res.data;

const employeeSlice = createSlice({
    name: "employees",
    initialState: data,
    reducers: {}
})

export const selectEmployees = (state: RootState) => state.employeeSlice.employees
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await workerInstance.post('/workers', _employee)
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
    try {
        const response = await workerInstance.delete(`/workers/${_num}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await workerInstance.put(`/workers/${_employee.userId}`, _employee)
        return response.data
    } catch (error) {
        return error
    }
});

export const getUserByEmail = createAsyncThunk('', async (email: string) => {
    try {
        const response = await workerInstance.get(`/user/email/${email}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const getUserByJwt = createAsyncThunk('', async () => {
    try {
        const response = await workerInstance.get('/user/jwt');
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
});

export const getUserById = createAsyncThunk('', async (id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/user/${id}`)
        return response.data.data;
    } catch (error) {
        return error
    }
});