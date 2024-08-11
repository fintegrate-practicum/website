import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { showErrorToast } from '../components/generic/errorMassage';
import { EmployeeRole } from '../modules/workers/classes/employeeRole';
import { statuses } from '../modules/workers/classes/enum/statuses.enum';
import InfraInstance from '../auth0/InfraInterceptors';

interface UserDetails {
  userName: string;
  userEmail: string;
  auth0_user_id: string;
  registeredAt: string;
  lastLogin: string;
  status: statuses;
  data?: any;
}

interface EmployeeDetails {
  id_user: string;
  businessId: string;
  role: EmployeeRole;
  nameEmployee: string;
}

interface CurrentUser {
  employeeDetails: EmployeeDetails;
  userDetails: UserDetails;
}

const initialState: CurrentUser = {
  employeeDetails: {
    id_user: '',
    businessId: '',
    role: new EmployeeRole('', true, ''),
    nameEmployee: '',
  },
  userDetails: {
    userName: '',
    userEmail: '',
    auth0_user_id: '',
    registeredAt: '',
    lastLogin: '',
    status: statuses.Married,
    data: {},
  },
};

export const fetchUserById = createAsyncThunk(
  'fetchUserById',
  async (payload: any, { dispatch }) => {
    try {
      const response = await InfraInstance.get(`/user/${payload.identities[0].user_id}`);
      const data = response.data;
      if (data.data == null) {
        await dispatch(updateCurrentUserByJwt(payload));
      }
      const mappedData: CurrentUser = {
        employeeDetails: {
          id_user: data._id,
          businessId:
            data.businessRoles && data.businessRoles.length > 0
              ? data.businessRoles[0].businessId
              : '',
          role: new EmployeeRole(data.businessRoles[0].role, true, ''),
          nameEmployee: data.userName,
        },
        userDetails: {
          userName: data.userName,
          userEmail: data.userEmail,
          auth0_user_id: data.auth0_user_id,
          registeredAt: data.registeredAt,
          lastLogin: data.lastLogin,
          status: statuses.Married, // Use actual status from data if available
          data: data.data,
        },
      };
      dispatch(currentUserSlice.actions.setCurrentUser(mappedData));
      return mappedData;
    } catch (error: any) {
      showErrorToast(error.message);
      throw error;
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'updateCurrentUser',
  async (payload: any) => {
    const { auth0_user_id, updatedCurrentUser } = payload;
    try {
      const response = await InfraInstance.put(
        `/user/${auth0_user_id}`,
        updatedCurrentUser,
      );
      return response.data;
    } catch (error: any) {
      showErrorToast(error.message);
      throw error;
    }
  },
);

export const updateCurrentUserByJwt = createAsyncThunk(
  'updateCurrentUserByJwt',
  async (payload: any) => {
    try {
      const response = await InfraInstance.put('/user/jwt', payload);
      return response.data;
    } catch (error: any) {
      showErrorToast(error.message);
      throw error;
    }
  },
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      return action.payload;
    },
  },
});


export const selectCurrentUser = (state: RootState) => state.currentUserSlice;
export default currentUserSlice.reducer;
