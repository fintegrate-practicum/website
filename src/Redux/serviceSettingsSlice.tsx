import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import infraInstance from '../auth0/InfraInterceptors';
import { ServiceSettings } from "../components/Setting/Category";

const initialState = {
  settings: [] as ServiceSettings[],
};

export const fetchServiceSettings = createAsyncThunk<ServiceSettings[]>(
  'serviceSettings/fetchServiceSettings',
  async () => {
    try {
      const response = await infraInstance.get('/service-settings');
      return response.data;
    } catch (error) {
       console.log('Failed to fetch service settings');
    }
  }
);

const serviceSettingsSlice = createSlice({
  name: "serviceSettings",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceSettings.fulfilled, (state, action: PayloadAction<ServiceSettings[]>) => {
        state.settings = action.payload;
      });
  },
});

export const createServiceSettings = createAsyncThunk(
  'serviceSettings/createServiceSettings',
  async (newServiceSettings: ServiceSettings) => {
    const response = await infraInstance.post('/service-settings', newServiceSettings);
    return response.data;
  }
);

export const fetchServiceSettingsById = createAsyncThunk(
  'serviceSettings/fetchServiceSettingsById',
  async (id: number) => {
    const response = await infraInstance.get(`/service-settings/${id}`);
    return response.data;
  }
);

export default serviceSettingsSlice.reducer;
