import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  text: "",
  show: false,
};

const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alerttext: (state, action) => {
      const { payload } = action;
      state.text = payload;
    },
    setalertOff: (state) => {
      state.show = false;
    },
    setalert: (state) => {
      state.show = true;
    },
  },
});

export const { alerttext, setalert, setalertOff } = alert.actions;
export default alert.reducer;
