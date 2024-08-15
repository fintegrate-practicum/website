import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import infraInstance from '../auth0/InfraInterceptors';
import { ServiceSettings } from '../components/Setting/Category';

const initialState = {
  settings: [] as ServiceSettings[],
  serviceNames: [] as string[],
};

export const fetchServiceSettings = createAsyncThunk<ServiceSettings[]>(
  'serviceSettings/fetchServiceSettings',
  async () => {
    try {
      const response = await infraInstance.get('/service-settings');
      return response.data;
    } catch (error) {
       console.log('Failed to fetch service settings');
       return [];
    }
  }
);

export const createServiceSettings = createAsyncThunk(
  'serviceSettings/createServiceSettings',
  async (newServiceSettings: ServiceSettings) => {
    try {
      const response = await infraInstance.post('/service-settings', newServiceSettings);
      return response.data;
    } catch (error) {
      console.log('Failed to create service settings');
    }
  }
);

export const fetchServiceNames = createAsyncThunk<string[]>(
  'serviceSettings/fetchServiceNames',
  async () => {
    try {
      const response = await infraInstance.get('/service-settings/names');
      return response.data;
    } catch (error) {
      console.log('Failed to fetch service names');
      return [];
    }
  }
);

export const fetchServiceSettingsByServiceName = createAsyncThunk<ServiceSettings, string>(
  'serviceSettings/fetchServiceSettingsByServiceName',
  async (serviceName) => {
    try {
      const response = await infraInstance.get(`/service-settings/${serviceName}`);
      return response.data;
    } catch (error) {
      console.log('Failed to fetch service settings');
    }
  },
);

const serviceSettingsSlice = createSlice({
  name: 'serviceSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchServiceSettings.fulfilled,
      (state, action: PayloadAction<ServiceSettings[]>) => {
        state.settings = action.payload;
      })
      .addCase(fetchServiceNames.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.serviceNames = action.payload;
      })
  },
});

export default serviceSettingsSlice.reducer;
