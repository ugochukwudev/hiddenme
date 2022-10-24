import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {} as any,
  loading: false,
};

const user = createSlice({
  name: "modal",
  initialState,
  reducers: {
    load: (state) => {
      state.loading = true;
    },
    unload: (state) => {
      state.loading = false;
    },
    userData: (state, action) => {
      const { payload } = action;
      state.user = { user: payload };
    },
  },
});

export const { load, unload, userData } = user.actions;
export default user.reducer;
