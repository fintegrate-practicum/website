import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "./store";
import { EmployeeRole } from "../classes/enum/employeeRole.enum";
import { statuses } from "../classes/user";
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
  async (_, { dispatch }) => {
    try {
      const { getAccessTokenSilently } = useAuth0();
      const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;
      const accessToken = await getAccessTokenSilently({      
        authorizationParams: {
          audience: auth0_audience,
          scope: "read:current_user",
        },
        
      });
      const response = await InfraInterceptors.get(`$/currentUser`, {
        headers: { 
            Authorization: `Bearer ${accessToken}`
    }});
      const data = response.data;   
      dispatch(currentUserSlice.actions.setCurrentUser(data));      
      return data;
    } catch (error: any) {
      showErrorToast(error.message);
    }
  }
);

export const updateCurrentUser = createAsyncThunk('', async (payload: any) => { 
  const { updatedCurrentUser, token } = payload;
  try {           
      const response = await InfraInterceptors.put(`/currentUser`, updatedCurrentUser, {
          headers: { 
              Authorization: `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error: any) {
      showErrorToast(error.message);
  }
});

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

