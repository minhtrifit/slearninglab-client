import { createAction } from "@reduxjs/toolkit";

export const updateSocket = createAction("update_socket");
export const updateUid = createAction("update_uid");
export const updateUsername = createAction("update_username");
export const removeSocket = createAction("remove_socket");
export const updateOnline = createAction("update_online");
