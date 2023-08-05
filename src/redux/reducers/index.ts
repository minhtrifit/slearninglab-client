import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});
