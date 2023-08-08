import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Space } from "antd";

const HomeClasses = () => {
  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  return (
    <div className="min-h-[1000px]">
      <Space size="large" className="flex justify-end">
        {roles.includes("teacher") && (
          <Button type="primary">Thêm lớp học</Button>
        )}
      </Space>
    </div>
  );
};

export default HomeClasses;
