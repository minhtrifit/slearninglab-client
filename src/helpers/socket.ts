// Listen event to socket
export const StartListeners = (socket: any, dispatch: any) => {
  socket.on("user_connected", (rs: { clientId: string; uid: string }) => {
    console.info("Client ID:", rs.clientId);
    console.info("Uid:", rs.uid);
    dispatch({ type: "update_uid", payload: rs.uid });
  });

  socket.on("user_exist", (rs: string) => {
    console.log(rs);
  });

  socket.on("connect_users_amount", (rs: number) => {
    dispatch({ type: "update_online", payload: rs });
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
