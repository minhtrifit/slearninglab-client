import { Message } from "../types/chat.type";

// Listen event to socket
export const StartListeners = (socket: any, dispatch: any) => {
  socket.on("user_connected", (rs: { clientId: string; uid: string }) => {
    // console.info("Client ID:", rs.clientId);
    // console.info("Uid:", rs.uid);
    dispatch({ type: "update_uid", payload: rs.uid });
  });

  socket.on("user_exist", (rs: string) => {
    console.log(rs);
  });

  socket.on("connect_users_amount", (rs: number) => {
    dispatch({ type: "update_online", payload: rs });
  });

  socket.on("join_class_notification", (rs: any) => {
    dispatch({
      type: "update_notification",
      payload: rs,
    });
  });

  socket.on("accept_join_class_notification", (rs: any) => {
    dispatch({
      type: "update_notification",
      payload: rs,
    });
  });

  socket?.on("message", (msg: Message) => {
    // console.log("Message:", msg);
    dispatch({ type: "update_chat_list", payload: msg });
  });
};

// Send event to socket
export const SendHandshake = async (socket: any, username: string) => {
  socket.emit(
    "get_connect",
    { username: username },
    (checkConnect: boolean) => {
      console.log("Check connect socket:", checkConnect);
    }
  );
};

export const SendJoinClassRequest = async (
  socket: any,
  username: string,
  teacherUsername: string,
  className: string,
  classId: string
) => {
  socket.emit(
    "join_class_request",
    {
      username: username,
      teacherUsername: teacherUsername,
      className: className,
      classId: classId,
    },
    (checkRequest: boolean) => {
      console.log("Check send class join request:", checkRequest);
    }
  );
};

export const acceptJoinClassRequest = async (
  socket: any,
  userJoinedUsername: string,
  teacherUsername: string,
  className: string,
  classId: string
) => {
  socket.emit(
    "accept_join_class_request",
    {
      userJoinedUsername: userJoinedUsername,
      teacherUsername: teacherUsername,
      className: className,
      classId: classId,
    },
    (checkRequest: boolean) => {
      console.log("Check send accept join class:", checkRequest);
    }
  );
};

export const joinClassChat = (
  socket: any,
  name: string,
  room: string | undefined
) => {
  socket?.emit("joinClassChat", { name: name, room: room }, (rs: any) => {
    // console.log("Joined:", rs);
  });
};

export const getAllChatByRoom = (
  socket: any,
  room: string | undefined,
  dispatch: any
) => {
  socket?.emit("findAllChat", { room: room }, (rs: Message[]) => {
    dispatch({ type: "update_chat_list", payload: rs });
  });
};

export const sendMessage = (
  socket: any,
  name: string,
  text: string,
  room: string,
  dispatch: any
) => {
  socket?.emit(
    "createChat",
    { name: name, text: text, room: room },
    (rs: Message) => {
      // console.log("Chat created", rs);
      if (rs) dispatch({ type: "update_chat_list", payload: rs });
    }
  );
};
