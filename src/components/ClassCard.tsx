import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";

import DetailClassInfoModal from "./DetailClassInfoModal";

import { ClassroomType } from "../types/class.type";

const { Meta } = Card;

interface PropType {
  id: string | undefined;
  className: string;
  teacherUsername: string;
  amount: number;
  img: string;
  subject: string;
  introduction: string;
  dateCreated: Date;
}

const ClassCard = (props: PropType) => {
  const { id, className, img, introduction, teacherUsername } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailClassInfo, setDetailClassInfo] = useState<
    ClassroomType | undefined
  >();

  const navigate = useNavigate();
  const dispatchAsync = useAppDispatch();

  const teacherClassList = useSelector<RootState, ClassroomType[]>(
    (state) => state.class.teacherClassList
  );

  const studentJoinedList = useSelector<RootState, ClassroomType[]>(
    (state) => state.class.studentJoinedList
  );

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  const handleActions = (name: string) => {
    if (name === "join") {
      navigate(`/home/classes/${id}`);
    } else if (name === "detail") {
      setIsModalOpen(true);

      if (roles.includes("teacher")) {
        const getDetailClassInfo = teacherClassList.filter((classroom) => {
          return classroom.id === id;
        });

        setDetailClassInfo(getDetailClassInfo[0]);
      } else if (roles.includes("student")) {
        const getDetailClassInfo = studentJoinedList.filter((classroom) => {
          return classroom.id === id;
        });

        setDetailClassInfo(getDetailClassInfo[0]);
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
            <img
              alt="example"
              src={img}
              className="w-[100%] object-cover border-2 border-solid border-gray-200"
            />
          </div>
        }
        actions={[
          <MenuOutlined
            key="detail"
            onClick={() => {
              handleActions("detail");
            }}
          />,
          <SendOutlined
            key="join"
            onClick={() => {
              handleActions("join");
            }}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar>{teacherUsername?.charAt(0).toUpperCase()}</Avatar>}
          title={className}
          description={introduction}
        />
      </Card>
    </>
  );
};

export default ClassCard;
