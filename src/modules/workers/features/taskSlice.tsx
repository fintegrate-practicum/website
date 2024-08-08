// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios"
// import task from "../classes/task";
// import {  UpdateTaskEmployeeDTO } from "../dto/updateTaskEmployeeDto";
// import { UpdateTaskManagerDTO } from "../dto/updateTaskManagerDto";
// import { RootState } from "../../../Redux/store";

// interface EditTaskArgs {
//   taskId: string;
//   updateTask: UpdateTaskManagerDTO | UpdateTaskEmployeeDTO;
//   employeeType: string; 
// }

// const baseUrl = import.meta.env.VITE_WORKERS_SERVICE_URL;
// const managerId = import.meta.env.VITE_MANAGERID;
// const businessId = import.meta.env.VITE_BUSINESSID;
// const response = await axios.get(`${baseUrl}/tasks/manager/${businessId}/${managerId}`);
// const { data = {} } = response.data;

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState: data,
//   reducers: {}
// })

// export const { } = taskSlice.actions;
// export const selectTasks = (state: RootState) => state.taskSlice.tasks;
// export default taskSlice.reducer;

// export const createTask = createAsyncThunk('',async (_task: task) => {
//   try {
//       const response = await axios.post(`${baseUrl}/tasks/manager/task`, _task)
//       return response.data
//   } catch (error) {
//       return error
//   }
// });

// export const editTask = createAsyncThunk('',async ({ taskId, updateTask, employeeType }: EditTaskArgs) => {
//     try {
      
//       const response = await axios.put(`${baseUrl}/tasks/task/${taskId}`, updateTask, {
//         headers: {
//           'employee-type': employeeType
//         }
//       });

//       return response.data;
//     } catch (error) {
//       return error
//     }
//   }
// );

// export const deleteTask = createAsyncThunk('',async (taskId:string) => {
//   try {
//       const response = await axios.delete(`${baseUrl}/tasks/manager/task/${taskId}`)
//       return response.data
//   } catch (error) {
//       return error
//   }
// });
