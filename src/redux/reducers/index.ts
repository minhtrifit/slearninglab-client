import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import socketReducer from "./socket.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
});
