import { useState } from "react";
import { Space, Table, Button, Input, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

import ExamDetail from "./ExamDetail";

import { ExamInfo } from "../types/exam.type";

import { getDetailExamById } from "../redux/reducers/exam.reducer";

interface DataType {
  key: number;
  id: string;
  examName: string;
  time: string;
}

const { Search } = Input;

const ExamList = () => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [recordId, setRecordId] = useState("");

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  const data: DataType[] = [];

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã bài thi",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên bài thi",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setOpenDetailModal(true);
              dispatchAsync(getDetailExamById(record.id));
            }}
          >
            Xem chi tiết
          </Button>
          <Button type="primary" danger>
            Xóa bài thi
          </Button>
        </Space>
      ),
    },
  ];

  const columns2: ColumnsType<DataType> = [
    {
      title: "Mã bài thi",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên bài thi",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showModal();
              setRecordId(record.id);
            }}
          >
            Làm bài thi
          </Button>
        </Space>
      ),
    },
  ];

  const findExamList = useSelector<RootState, ExamInfo[]>(
    (state) => state.exam.findExamList
  );

  findExamList.map((exam, index) => {
    const examData: DataType = {
      key: index + 1,
      id: exam.id,
      examName: exam.examName,
      time: `${exam.time} phút`,
    };

    return data.push(examData);
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      navigate(`/exam/${recordId}`);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Xác nhận làm bài thi"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn làm bài thi ?</p>
      </Modal>
      <ExamDetail
        openDetailModal={openDetailModal}
        setOpenDetailModal={setOpenDetailModal}
      />
      <Space.Compact>
        <Search
          placeholder="Tìm kiếm bài thi"
          allowClear
          onChange={(e) => {
            dispatch({ type: "find_exam", payload: e.target.value });
          }}
        />
      </Space.Compact>
      {roles.includes("teacher") && (
        <Table className="mt-10" columns={columns} dataSource={data} />
      )}
      {roles.includes("student") && (
        <Table className="mt-10" columns={columns2} dataSource={data} />
      )}
    </>
  );
};

export default ExamList;
