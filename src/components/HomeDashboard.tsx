import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HomeBanner from "./HomeBanner";
import { Space, Statistic } from "antd";
import { useCountUp } from "use-count-up";
import {
  BarChartOutlined,
  FileTextOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import TaskList from "./TaskList";
import UserCalendar from "./UserCalender";

interface PropType {
  isDarkMode: boolean;
}

const CustomCountUp = (end: any) => {
  const { value } = useCountUp({
    isCounting: true,
    end: end.value,
    duration: 2,
    decimalSeparator: ",",
    thousandsSeparator: ",",
  });

  return value;
};

const formatter = (value: any) => <CustomCountUp value={value} />;

const HomeDashboard = (props: PropType) => {
  const { isDarkMode } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const name = useSelector<RootState, string>((state) => state.user.name);

  return (
    <div className="min-h-[900px]">
      <HomeBanner />
      <Space className="w-[100%] xl:w-[80%] mx-auto my-20 flex flex-col items-start 2xl:flex-row 2xl:justify-between">
        <Space size="middle" className="flex flex-col items-start">
          <p className="text-2xl font-bold">Chào mừng quay trở lại, {name}!</p>
          <p>Thống kê hệ thống học tập:</p>
        </Space>
        <Space
          size="large"
          className="mt-10 flex flex-col items-start 2xl:mt-0 lg:flex-row"
        >
          <Space size="large">
            <BarChartOutlined className="text-5xl" />
            <Statistic
              title="Số lớp học hoạt động"
              value={120046}
              formatter={formatter}
            />
          </Space>
          <Space size="large" className="mx-0 lg:mx-10">
            <FileTextOutlined className="text-5xl" />
            <Statistic
              title="Số bài thi hiện hành"
              value={51250}
              formatter={formatter}
            />
          </Space>
          <Space size="large">
            <PieChartOutlined className="text-5xl" />
            <Statistic
              title="Truy cập trong ngày"
              value={150}
              formatter={formatter}
            />
          </Space>
        </Space>
      </Space>
      <UserCalendar isDarkMode={isDarkMode} />
      <Space
        size="large"
        className="mx-auto my-40 flex flex-col w-[100%] lg:w-[80%]"
      >
        <div className="w-[65vw]">
          <p className="text-2xl font-bold mb-5">
            Ghi chú tiến trình học tập của bạn:
          </p>
          <p>Đừng bỏ lỡ sự kiện nào quan trọng!</p>
        </div>
        <TaskList isDarkMode={isDarkMode} />
      </Space>
    </div>
  );
};

export default HomeDashboard;
