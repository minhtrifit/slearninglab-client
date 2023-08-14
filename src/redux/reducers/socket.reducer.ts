import { createReducer } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  updateSocket,
  updateUid,
  updateUsername,
  removeSocket,
  updateOnline,
  updateNotification,
  acceptClassRequest,
  refuseClassRequest,
  confirmAcceptClass,
} from "../actions/socket.action";

// Interface declair
interface SocketState {
  socket: Socket | undefined;
  uid: string | undefined;
  username: string | undefined;
  online: number | undefined;
  notificationCount: number;
  notificationList: any[];
}

// InitialState value
const initialState: SocketState = {
  socket: undefined,
  uid: "",
  username: "",
  online: 0,
  notificationCount: 0,
  notificationList: [],
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
    })
    .addCase(updateNotification, (state, action) => {
      if (action.payload) {
        state.notificationCount = state.notificationCount + 1;
        state.notificationList.push(action.payload);
      }
    })
    .addCase(refuseClassRequest, (state, action: any) => {
      if (action.payload) {
        state.notificationList = state.notificationList.filter((noti) => {
          return noti.id !== action.payload.id;
        });
      }
      state.notificationCount = state.notificationCount - 1;
    })
    .addCase(acceptClassRequest, (state, action: any) => {
      if (action.payload) {
        state.notificationList = state.notificationList.filter((noti) => {
          return noti.id !== action.payload.id;
        });
      }
      state.notificationCount = state.notificationCount - 1;
    })
    .addCase(confirmAcceptClass, (state, action: any) => {
      if (action.payload) {
        state.notificationList = state.notificationList.filter((noti) => {
          return noti.id !== action.payload;
        });
      }
      state.notificationCount = state.notificationCount - 1;
    });
});

export default socketReducer;
