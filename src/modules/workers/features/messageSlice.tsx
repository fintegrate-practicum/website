import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../Redux/store";
import message from "../classes/message";

interface MessageState {
  messages: message[];
}

const initialState: MessageState = {
  messages: [],
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (employeeId: string) => {
    console.log(`i in get all messages for employee ${employeeId}`)
    const response = await axios.get(`http://localhost:4006/message/66ab938b943e962100886a34`);
    return response.data.data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<message[]>) => {
      state.messages = action.payload;
    });
  },
});

export const selectMessages = (state: RootState) => state.messageSlice.messages;
export default messageSlice.reducer;