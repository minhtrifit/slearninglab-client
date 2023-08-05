import { Space, Spin } from "antd";

const Loading = () => {
  return (
    <Space direction="vertical" size="middle" className="flex flex-row">
      <p className="text-sky-500 font-bold text-xl text-center">VUI LÒNG CHỜ</p>
      <Spin size="large" />
    </Space>
  );
};

export default Loading;
