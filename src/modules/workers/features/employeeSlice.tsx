import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import axios from "axios";
import employee from "../classes/employee";
import workerInstance from "../../../auth0/WorkersInterceptors";

const baseUrl = import.meta.env.VITE_WORKERS_SERVICE_URL;
const http = import.meta.env.WORKERS_SERVICE_URL;
const businessId = import.meta.env.VITE_BUSINESSID;
const res = await axios.get(`${baseUrl}/workers?businessId=${businessId}`);
const { data = {} } = res.data;

const employeeSlice = createSlice({
    name: "employees",
    initialState: data,
    reducers: {}
})

export const selectEmployees = (state :RootState) => state.employeeSlice.employees
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        console.log('add employee slice')
        const response = await workerInstance.post('/workers', _employee)
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/workers/${_num}`)
        return response.data
    } catch (error) {
        console.error('error', error)
    }
});

export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.put(`${http}/workers/${_employee.userId}`, _employee)
        return response.data
    } catch (error) {
        console.error('error', error)
    }
});

export const getUserByEmail = createAsyncThunk('', async (email: string) => {
    try {
        const response = await workerInstance.get(`/user/email/${email}`)
        return response.data
    } catch (error) {
        console.error('error', error)
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