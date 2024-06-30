import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { Types } from "mongoose";
import { EmployeeRole } from "../classes/enum/employeeRole.enum";
import { statuses } from "../classes/user";

const http = import.meta.env.VITE_SERVER_URL;

const initialState = {
  CurrentUser: {
    employeeDetails: {
        id_user:new Types.ObjectId(),
        businessId: new Types.ObjectId(),
        code: '',
        createdBy: '',
        updatedBy: '',
        role: new EmployeeRole('cleaner', true, "hhgg"),
        nameEmployee: '',
      
    },
    userDetails: {
        userName: 'aaa',
        userEmail: '',
        auth0_user_id: '',
        registeredAt: new Date(),
        lastLogin: new Date(),
        mobile: '',
        status: statuses.Married,
        dateOfBirth: new Date(),
        address: {
          city: '',
          street: '',
          num: 0
        },
        data: {}
      
      
    }
  }
}

export const fetchUserById = createAsyncThunk(
  'fetchUserById',
  async (userId: string, { dispatch }) => {
    try {
      const response = await axios.get(`${http}/currentUser/currentUser/${userId}`);
      const data = response.data;      
      dispatch(currentUserSlice.actions.setCurrentUser(data));      
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

export const updateCurrentUser = createAsyncThunk('', async (payload: any) => { 
    const { auth0_user_id, updatedCurrentUser } = payload;
    try {           
        const response = await axios.put(`${http}/currentUser/${auth0_user_id}`, updatedCurrentUser);
        return response.data;
    } catch (error) {
        throw error;
    }
}
)

const currentUserSlice = createSlice({
  name: "CurrentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {  
      
      state.CurrentUser = action.payload;
      console.log(state.CurrentUser);
       
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.currentUserSlice.CurrentUser;
export default currentUserSlice.reducer;

