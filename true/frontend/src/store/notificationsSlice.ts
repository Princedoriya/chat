import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: [] as { id: number; text: string }[] },
  reducers: {
    addNotification: (state, action) => {
      state.items.push({ id: Date.now(), text: action.payload });
    },
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
