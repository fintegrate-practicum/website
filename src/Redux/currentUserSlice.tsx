import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { EmployeeRole } from "../modules/workers/classes/employeeRole";
import { statuses } from "../modules/workers/classes/enum/statuses.enum";
import { showErrorToast } from "../components/generic/errorMassage";
import InfraInterceptors from '../auth0/InfraInterceptors'

const initialState = {
  CurrentUser: {
    employeeDetails: {
        id_user:'6672aed7e631b436cad2e121',
        businessId: '6672aed7e631b436cad2e121',
        code: '',
        createdBy: '',
        updatedBy: '',
        role: new EmployeeRole('', true, "hhgg"),
        nameEmployee: '',
    },
    userDetails: {
        userName: '',
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
      const response = await InfraInterceptors.get(`/user/${userId}`);
      const data = response.data;   
      dispatch(currentUserSlice.actions.setCurrentUser(data));      
      return data;
    } catch (error: any) {
      showErrorToast(error.message);
    }
  }
);

export const updateCurrentUser = createAsyncThunk('', async (payload: any) => { 
    const { auth0_user_id, updatedCurrentUser } = payload;
    try {           
        const response = await InfraInterceptors.put(`$/user/${auth0_user_id}`, updatedCurrentUser);
        return response.data;
    } catch (error:any) {
      showErrorToast(error.message);
    }
}
)

const currentUserSlice = createSlice({
  name: "CurrentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {   
      state.CurrentUser = action.payload;          
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.currentUserSlice.CurrentUser;
export default currentUserSlice.reducer;

