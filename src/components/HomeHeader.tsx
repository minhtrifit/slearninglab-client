import { Layout, Switch, Space, Dropdown, MenuProps } from "antd";
import {
  DownOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/user/profile">Trang cá nhân</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "2",
    danger: true,
    label: "Đăng xuất",
    icon: <PoweroffOutlined />,
  },
];

interface propType {
  Header: typeof Header;
  isDarkMode: boolean;
  colorBgContainer: any;
  Switch: typeof Switch;
  switchMode: any;
}

const HomeHeader = (props: propType) => {
  const { Header, isDarkMode, colorBgContainer, Switch, switchMode } = props;

  return (
    <Header
      style={{
        background: !isDarkMode ? colorBgContainer : undefined,
      }}
      className="h-28 pt-5 flex flex-col items-center justify-around sm:pt-0 sm:flex-row sm:justify-between sm:h-14"
    >
      <p className="text-2xl font-bold">SLearningLab</p>
      <Space size="large">
        <Switch
          checkedChildren="Sáng"
          unCheckedChildren="Tối"
          defaultChecked
          onChange={switchMode}
        />
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Xin chào
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HomeHeader;
