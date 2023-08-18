import { useDispatch, useSelector } from "react-redux";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Avatar, Card } from "antd";
import { RootState } from "../redux/store";
import { Socket } from "socket.io-client";

import { SendJoinClassRequest } from "../helpers/socket";

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

  const socket = useSelector<RootState, Socket | undefined>(
    (state) => state.socket.socket
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const handleActions = (name: string) => {
    if (name === "requestJoin") {
      toast.info("Đã gửi yêu cầu tham gia lớp học");
      SendJoinClassRequest(socket, username, teacherUsername, className, id);
    }
  };

  return (
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
  );
};

export default ClassJoinCard;
