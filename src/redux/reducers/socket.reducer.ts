import { createReducer } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  updateSocket,
  updateUid,
  updateUsername,
  removeSocket,
  updateOnline,
} from "../actions/socket.action";

// Interface declair
interface SocketState {
  socket: Socket | undefined;
  uid: string | undefined;
  username: string | undefined;
  online: number | undefined;
}

// InitialState value
const initialState: SocketState = {
  socket: undefined,
  uid: "",
  username: "",
  online: 0,
};

const socketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSocket, (state, action) => {
      state.socket = action.payload;
    })
    .addCase(updateUid, (state, action) => {
      state.uid = action.payload;
    })
    .addCase(updateUsername, (state, action) => {
      state.username = action.payload;
    })
    .addCase(removeSocket, (state) => {
      state.socket = undefined;
      state.uid = "";
      state.username = "";
    })
    .addCase(updateOnline, (state, action) => {
      state.online = action.payload;
    });
});

export default socketReducer;
