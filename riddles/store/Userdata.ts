import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: {} as any,
  loading: false,
};

const user = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { payload } = action;
      state.userInfo = payload;
    },
  },
});

export const { setUserInfo } = user.actions;
export default user.reducer;
