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

import { getClassInfoById } from "../redux/reducers/class.reducer";

const tabItems: any[] = [
  {
    label: (
      <span>
        <FormOutlined />
        Bài thi
      </span>
    ),
    key: 1,
    children: <div>1</div>,
  },
  {
    label: (
      <span>
        <MessageOutlined />
        Trò chuyện
      </span>
    ),
    key: 2,
    children: <div>2</div>,
  },
  {
    label: (
      <span>
        <FilePdfOutlined />
        Tài liệu
      </span>
    ),
    key: 3,
    children: <div>3</div>,
  },
];

const ClassPage = () => {
  const routeParams = useParams();

  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

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
