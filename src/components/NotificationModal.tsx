import { Modal, Button, Card, Empty, Space, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";

import { acceptJoinClass } from "../redux/reducers/class.reducer";
import { confirmAcceptClass } from "../redux/actions/socket.action";

import { acceptJoinClassRequest } from "../helpers/socket";

interface PropType {
  openModal: any;
  setOpenModal: any;
}

const NotificationModal = (props: PropType) => {
  const { openModal, setOpenModal } = props;

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const socket = useSelector<RootState, Socket | undefined>(
    (state) => state.socket.socket
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const notificationList = useSelector<RootState, any[]>(
    (state) => state.socket.notificationList
  );

  if (notificationList.length !== 0) console.log(notificationList);

  const handleAcceptClassJoin = async (
    id: string,
    classId: string,
    userJoinedUsername: string,
    className: string
  ) => {
    const rs = await dispatchAsync(
      acceptJoinClass({
        classId: classId,
        userJoinedId: userJoinedUsername,
        dateJoined: new Date(new Date().getTime()),
      })
    );

    dispatch({
      type: "accept_class_request",
      payload: {
        id: id,
      },
    });

    // Send socket event to server
    acceptJoinClassRequest(
      socket,
      userJoinedUsername,
      username,
      className,
      classId
    );
  };

  return (
    <Modal
      title="Thông báo"
      style={{ top: 50 }}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      width={700}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Thoát
        </Button>,
      ]}
    >
      <div className="max-h-[500px] flex flex-col overflow-y-auto">
        {notificationList.length === 0 && (
          <Empty description="Không có thông báo" />
        )}
        {notificationList.length !== 0 &&
          notificationList.map((noti, index) => {
            if (noti.type === "join") {
              return (
                <Card
                  key={index + 12354235345}
                  title="Yêu cầu tham gia lớp học:"
                  bordered={false}
                  className="my-3"
                  actions={[]}
                >
                  <Space className="flex flex-col w-[100%] items-end">
                    <Space size="middle">
                      <Avatar>{noti.username?.charAt(0).toUpperCase()}</Avatar>
                      <div>
                        {noti.username} đã yêu cầu tham gia lớp học{" "}
                        {noti.className} (mã lớp học: {noti.classId}) của bạn
                      </div>
                    </Space>
                    <Space size="middle" className="my-3 flex flex-row">
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          dispatch({
                            type: "refuse_class_request",
                            payload: {
                              id: noti.id,
                            },
                          });
                        }}
                      >
                        Từ chối
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          handleAcceptClassJoin(
                            noti.id,
                            noti.classId,
                            noti.username,
                            noti.className
                          );
                        }}
                      >
                        Đồng ý
                      </Button>
                    </Space>
                  </Space>
                </Card>
              );
            } else if (noti.type === "accept_join") {
              return (
                <Card
                  key={index + 12354235345}
                  title="Xác nhận yêu cầu tham gia lớp học"
                  bordered={false}
                  className="my-3"
                  actions={[]}
                >
                  <Space className="flex flex-col w-[100%] items-end">
                    <Space size="middle">
                      <Avatar>
                        {noti.teacherUsername?.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>
                        {noti.teacherUsername} đã chấp nhận yêu cầu tham gia lớp
                        học {noti.className} (mã lớp học: {noti.classId}) của
                        bạn
                      </div>
                    </Space>
                    <Space size="middle" className="my-3 flex flex-row">
                      <Button
                        type="primary"
                        onClick={() => {
                          dispatch(confirmAcceptClass(noti.id));
                        }}
                      >
                        Xác nhận
                      </Button>
                    </Space>
                  </Space>
                </Card>
              );
            }
          })}
      </div>
    </Modal>
  );
};

export default NotificationModal;
