import { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";

import { getExamResultByUsername } from "../redux/reducers/exam.reducer";

interface DataType {
  key: string;
  name: string;
  className: string;
  result: string;
  date: string;
}

const UserExamResult = (props: any) => {
  const { username } = props;

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã bài thi",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên bài thi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Kết quả",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Ngày thi",
      dataIndex: "date",
      key: "date",
    },
  ];

  const dispatchAsync = useAppDispatch();

  const userExamResult: DataType[] = useSelector<RootState, any[]>(
    (state) => state.exam.userExamResult
  );

  const handleGetExamResult = async () => {
    await dispatchAsync(getExamResultByUsername(username));
  };

  useEffect(() => {
    if (username !== undefined) handleGetExamResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="mt-32">
      <p className="mb-5 text-xl font-bold">Lịch sử bài thi</p>
      <Table columns={columns} dataSource={userExamResult} />
    </div>
  );
};

export default UserExamResult;
