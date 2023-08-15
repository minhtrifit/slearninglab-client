import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import socketReducer from "./socket.reducer";
import classReducer from "./class.reducer";
import examReducer from "./exam.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  class: classReducer,
  exam: examReducer,
});
