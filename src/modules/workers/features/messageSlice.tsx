import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../Redux/store';
import message from '../classes/message';

interface MessageState {
  messages: message[];
}

const initialState: MessageState = {
  messages: [],
};
const workersServiceUrl = import.meta.env.VITE_WORKERS_SERVICE_URL;

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (employeeId: string) => {
    const response = await axios.get(
      `${workersServiceUrl}/message/${employeeId}`,
    );
    return response.data;
  },
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchMessages.fulfilled,
      (state, action: PayloadAction<message[]>) => {
        state.messages = action.payload;
      },
    );
  },
});

export const selectMessages = (state: RootState) => state.messageSlice.messages;
export default messageSlice.reducer;
