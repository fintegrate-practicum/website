import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import infraInstance from '../auth0/InfraInterceptors';

interface Setting {
  key: string;
  value: any;
}

interface ServiceSetting {
  serviceName: string;
  settings: Setting[];
}

export const saveServiceSettings = createAsyncThunk(
  'serviceSettings/saveServiceSettings',
  async (serviceSettings: ServiceSetting) => {
    const response = await infraInstance.post('/service-configurations', serviceSettings);
    return response.data as ServiceSetting;
  }
);

const serviceSettingsSlice = createSlice({
  name: 'serviceSettings',
  initialState: {
    serviceSettings: {} as { [key: string]: ServiceSetting }, 
  },
  reducers: {
    updateSetting(state, action: PayloadAction<{ serviceName: string; key: string; value: any }>) {
      const { serviceName, key, value } = action.payload;
      const service = state.serviceSettings[serviceName];
      if (service) {
        const setting = service.settings.find(s => s.key === key);
        if (setting) {
          setting.value = value;
        } else {
          service.settings.push({ key, value });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveServiceSettings.fulfilled, (state, action) => {
        state.serviceSettings[action.payload.serviceName] = action.payload;
      })
  },
});

export const { updateSetting } = serviceSettingsSlice.actions;

export default serviceSettingsSlice.reducer;
