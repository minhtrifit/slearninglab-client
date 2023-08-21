import { useParams } from "react-router-dom";
import {
  MessageOutlined,
  FormOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { Tabs, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { ClassroomType } from "../types/class.type";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Socket } from "socket.io-client";

import { getClassInfoById } from "../redux/reducers/class.reducer";

import ClassExam from "../components/ClassExam";
import ClassChat from "../components/ClassChat";
import ClassDocument from "../components/ClassDocument";

import { joinClassChat } from "../helpers/socket";

const tabItems: any[] = [
  {
    label: (
      <span>
        <FormOutlined />
        Bài thi
      </span>
    ),
    key: 1,
    children: <ClassExam />,
  },
  {
    label: (
      <span>
        <MessageOutlined />
        Trò chuyện
      </span>
    ),
    key: 2,
    children: <ClassChat />,
  },
  {
    label: (
      <span>
        <FilePdfOutlined />
        Tài liệu
      </span>
    ),
    key: 3,
    children: <ClassDocument />,
  },
];

const ClassPage = () => {
  const routeParams = useParams();

  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  const socket = useSelector<RootState, Socket | undefined>(
    (state) => state.socket.socket
  );

  const detailClass = useSelector<RootState, ClassroomType | null>(
    (state) => state.class.detailClass
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const handleGetAllClasses = async () => {
    const rs = await dispatchAsync(
      getClassInfoById({ id: routeParams.id, username: username })
    );
    if (rs?.payload?.response?.data?.message === "User not joined this class") {
      navigate("/home/classes");
      toast.error("Bạn chưa tham gia lớp học này");
    }
  };

  useEffect(() => {
    handleGetAllClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exam result event
  useEffect(() => {
    const checkResult: string | null = sessionStorage.getItem("examResult");
    if (checkResult === "true" && checkResult !== null) {
      toast.success("Nộp bài thành công");
    } else if (checkResult === "false" && checkResult !== null) {
      toast.error("Nộp bài thất bại");
    }
    sessionStorage.removeItem("examResult");
  }, []);

  useEffect(() => {
    if (username !== undefined && detailClass?.id !== undefined)
      joinClassChat(socket, username, detailClass?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, detailClass]);

  return (
    <div className="min-h-[900px]">
      {/* <ToastContainer position="bottom-left" theme="colored" /> */}
      <Space size="large" className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            navigate("/home/classes");
          }}
        >
          Quay lại
        </Button>
      </Space>
      <p className="text-2xl my-5">
        Chào mừng bạn đến lớp học: {detailClass?.className}
      </p>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

export default ClassPage;
