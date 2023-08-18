import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Avatar, Card } from "antd";
import { Socket } from "socket.io-client";

import { SendJoinClassRequest } from "../helpers/socket";

import { ClassroomType } from "../types/class.type";

import DetailClassInfoModal from "./DetailClassInfoModal";

import { getClassInfoById } from "../redux/reducers/class.reducer";

const { Meta } = Card;

interface PropType {
  id: string | undefined | any;
  className: string;
  teacherUsername: string;
  amount: number;
  img: string;
  subject: string;
  introduction: string;
  dateCreated: Date;
}

const ClassJoinCard = (props: PropType) => {
  const { id, className, img, introduction, teacherUsername } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailClassInfo, setDetailClassInfo] = useState<
    ClassroomType | undefined
  >();

  const dispatchAsync = useAppDispatch();

  const socket = useSelector<RootState, Socket | undefined>(
    (state) => state.socket.socket
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  const handleActions = async (name: string) => {
    if (name === "requestJoin") {
      toast.info("Đã gửi yêu cầu tham gia lớp học");
      SendJoinClassRequest(socket, username, teacherUsername, className, id);
    } else if (name === "detail") {
      setIsModalOpen(true);
      const rs = await dispatchAsync(getClassInfoById(id));

      if (rs.type === "class/get_class_info_by_id/fulfilled") {
        setDetailClassInfo(rs.payload);
      }
    }
  };

  return (
    <>
      <DetailClassInfoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        detailClassInfo={detailClassInfo}
      />
      <Card
        className="w-[250px]"
        cover={
          <div className="w-[100%] h-[200px]">
            <img alt="example" src={img} className="w-[100%] object-cover" />
          </div>
        }
        actions={[
          <MenuOutlined
            key="detail"
            onClick={() => {
              handleActions("detail");
            }}
          />,
          <LoginOutlined
            key="join"
            onClick={() => {
              handleActions("requestJoin");
            }}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar>{teacherUsername.charAt(0).toUpperCase()}</Avatar>}
          title={className}
          description={introduction}
        />
      </Card>
    </>
  );
};

export default ClassJoinCard;
