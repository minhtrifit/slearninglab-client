import { Menu, MenuProps } from "antd";
import { RedditOutlined } from "@ant-design/icons";

interface propType {
  Sider: any;
  isDarkMode: boolean;
  navContentDefault: number;
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
}

const HomeNavigation = (props: propType) => {
  const { Sider, isDarkMode, navContentDefault, items, onClick } = props;
  return (
    <Sider
      breakpoint="sm"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: isDarkMode ? undefined : "#fff",
      }}
    >
      {/* <div className="demo-logo-vertical" /> */}
      <div
        className={`${
          !isDarkMode
            ? "flex justify-center mt-7 text-black"
            : "flex justify-center mt-7 text-white"
        }`}
      >
        <RedditOutlined className="text-3xl" />
        <p className="hidden text-xl font-bold ml-2 sm:block">SLearningLab</p>
      </div>
      <Menu
        className="mt-5"
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={[`${navContentDefault}`]}
        items={items}
        onClick={onClick}
      />
    </Sider>
  );
};

export default HomeNavigation;
