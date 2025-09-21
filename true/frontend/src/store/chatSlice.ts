import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now().toString(),
        sender: "user",
        text: action.payload,
      });
      // Demo reply
      state.messages.push({
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "This is a demo response.",
      });
    },
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
