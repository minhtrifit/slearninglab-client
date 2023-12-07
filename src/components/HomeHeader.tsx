import {
  Layout,
  Switch,
  Space,
  Dropdown,
  MenuProps,
  Statistic,
  Badge,
} from "antd";
import {
  DownOutlined,
  UserOutlined,
  PoweroffOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCountUp } from "use-count-up";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import NotificationModal from "./NotificationModal";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    key: "profile",
    label: <Link to="/home/profile">Trang cá nhân</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "logout",
    danger: true,
    label: "Đăng xuất",
    icon: <PoweroffOutlined />,
  },
];

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

interface propType {
  Header: typeof Header;
  isDarkMode: boolean;
  colorBgContainer: any;
  Switch: typeof Switch;
  switchMode: any;
  name: string;
  onClick: any;
}

const HomeHeader = (props: propType) => {
  const {
    Header,
    isDarkMode,
    colorBgContainer,
    Switch,
    switchMode,
    name,
    onClick,
  } = props;

  const [openNotiModal, setOpenNotiModal] = useState(false);

  const online = useSelector<RootState, number | undefined>(
    (state) => state.socket.online
  );

  const notificationCount = useSelector<RootState, number>(
    (state) => state.socket.notificationCount
  );

  return (
    <Header
      style={{
        background: !isDarkMode ? colorBgContainer : undefined,
      }}
      className="h-28 py-20 px-5 flex flex-col items-start justify-around sm:flex-row sm:items-center sm:justify-between sm:h-20 sm:p-5"
    >
      <div className="w-[200px] flex">
        <Statistic
          title="Người dùng hoạt động"
          value={online}
          formatter={formatter}
        />
      </div>
      <NotificationModal
        openModal={openNotiModal}
        setOpenModal={setOpenNotiModal}
      />
      <Space size="large">
        <Switch
          checkedChildren="Sáng"
          unCheckedChildren="Tối"
          defaultChecked
          onChange={switchMode}
        />
        <Badge
          count={notificationCount}
          className="mt-6 mx-3 hover:cursor-pointer"
        >
          <BellOutlined
            className="text-2xl"
            onClick={() => {
              setOpenNotiModal(true);
            }}
          />
        </Badge>
        <Dropdown
          menu={{
            onClick: onClick,
            items: items,
          }}
        >
          <a
            className={`${!isDarkMode ? "text-black" : "text-white"}`}
            onClick={(e) => onClick(e)}
          >
            <Space>
              {name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HomeHeader;
