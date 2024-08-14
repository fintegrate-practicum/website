import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/store';
import message from '../classes/message';
import workerInstance from '../../../auth0/WorkersInterceptors';

interface MessageState {
  messages: message[];
}

const initialState: MessageState = {
  messages: [],
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (employeeId: string) => {
    const response = await workerInstance.get(`/message/${employeeId}`);
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
