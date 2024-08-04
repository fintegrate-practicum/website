// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../../Redux/store";

// import axios from "axios";
// import employee from "../classes/employee";

// const baseUrl = import.meta.env.VITE_WORKERS_SERVICE_URL;
// const businessId = import.meta.env.VITE_BUSINESSID;
// const res = await axios.get(`${baseUrl}/workers?businessId=${businessId}`);
// const { data = {} } = res.data;

// const employeeSlice = createSlice({
//     name: "employees",
//     initialState: data,
//     reducers: {}
// })

// export const { } = employeeSlice.actions;
// export const selectEmployees = (state :RootState) => state.employeeSlice.employees
// export default employeeSlice.reducer;

// export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
//     try {
//         const response = await axios.post(`${baseUrl}/workers`, _employee);
//         return response.data
//     } catch (error) {
//         return error
//     }
// });

// export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
//     try {
//         const response = await axios.delete(`${baseUrl}/workers/${_num}`)
//         return response.data
//     } catch (error) {
//         return error
//     }
// });

// export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
//     try {
//         const response = await axios.put(`${baseUrl}/workers/${_employee.userId}`, _employee)
//         return response.data
//     } catch (error) {
//         return error
//     }
// });