import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";

import { ExamInfo } from "../types/exam.type";

interface DataType {
  key: number;
  id: string;
  examName: string;
  time: string;
}

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
        <Button type="primary">Xem chi tiết</Button>
        <Button type="primary" danger>
          Xóa bài thi
        </Button>
      </Space>
    ),
  },
];

const ExamList = () => {
  const data: DataType[] = [];

  const examList = useSelector<RootState, ExamInfo[]>(
    (state) => state.exam.examList
  );

  examList.map((exam, index) => {
    const examData: DataType = {
      key: index + 1,
      id: exam.id,
      examName: exam.examName,
      time: `${exam.time} phút`,
    };

    return data.push(examData);
  });

  return <Table className="mt-10" columns={columns} dataSource={data} />;
};

export default ExamList;
