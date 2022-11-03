import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import alert from "./alert";
export const store = configureStore({
  reducer: {
    user: user,
    alert,
  },
});
