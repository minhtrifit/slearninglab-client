import { createAction } from "@reduxjs/toolkit";

export const updateSocket = createAction("update_socket");
export const updateUid = createAction("update_uid");
export const updateUsername = createAction("update_username");
export const removeSocket = createAction("remove_socket");
export const updateOnline = createAction("update_online");
export const updateNotification = createAction("update_notification");
export const acceptClassRequest = createAction("accept_class_request");
export const refuseClassRequest = createAction("refuse_class_request");
export const confirmAcceptClass = createAction("confirm_accept_class");
