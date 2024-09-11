import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { State } from '../../../../app/actions';
import { IClient } from '../../interfaces/Iclient';

const initialState: State<IClient> = {
  data: [],
};

export const getClientByBusinessId = createAsyncThunk(
  'client/getClientByBusinessId',
  async (businessId: string) => {
    const response = await fetch(
      `http://localhost:4006/admin/business/${businessId}/client`,
    );
    const data = await response.json();
    return data;
  },
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientByBusinessId.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export default clientSlice.reducer;
