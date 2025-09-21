import { createSlice } from "@reduxjs/toolkit";

const creditsSlice = createSlice({
  name: "credits",
  initialState: { value: 100 },
  reducers: {
    setCredits: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCredits } = creditsSlice.actions;
export default creditsSlice.reducer;
