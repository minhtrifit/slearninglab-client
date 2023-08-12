import React from "react";
import { Modal, Button, Card, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";

import { acceptJoinClass } from "../redux/reducers/class.reducer";

interface PropType {
  openModal: any;
  setOpenModal: any;
}

const NotificationModal = (props: PropType) => {
  const { openModal, setOpenModal } = props;

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const notificationList = useSelector<RootState, any[]>(
    (state) => state.socket.notificationList
  );

  const handleAcceptClassJoin = async (
    id: string,
    classId: string,
    username: string
  ) => {
    const rs = await dispatchAsync(
      acceptJoinClass({
        classId: classId,
        userJoinedId: username,
        dateJoined: new Date(new Date().getTime()),
      })
    );

    console.log(rs);
    dispatch({
      type: "accept_class_request",
      payload: {
        id: id,
      },
    });
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
                  actions={[
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
                    </Button>,
                    <Button
                      type="primary"
                      onClick={() => {
                        handleAcceptClassJoin(
                          noti.id,
                          noti.classId,
                          noti.username
                        );
                      }}
                    >
                      Đồng ý
                    </Button>,
                  ]}
                >
                  {noti.username} đã yêu cầu tham gia lớp học {noti.className}{" "}
                  (mã lớp học: {noti.classId}) của bạn
                </Card>
              );
            }
          })}
      </div>
    </Modal>
  );
};

export default NotificationModal;
