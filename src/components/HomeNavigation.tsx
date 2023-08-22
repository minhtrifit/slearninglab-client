import { useState, useEffect } from "react";
import { Menu, MenuProps } from "antd";
import { RedditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface propType {
  Sider: any;
  isDarkMode: boolean;
  navContentDefault: number;
  setNavContentDefault: any;
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
}

const HomeNavigation = (props: propType) => {
  const {
    Sider,
    isDarkMode,
    navContentDefault,
    setNavContentDefault,
    items,
    onClick,
  } = props;

  const [navValue, setNavValue] = useState("");
  const url = window.location.href;

  useEffect(() => {
    if (url.includes("/classes")) {
      setNavValue("2");
    } else if (url.includes("/profile")) {
      setNavValue("3");
    } else {
      setNavValue("1");
    }
  }, [url]);

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
        <Link
          to="/home"
          className={`${
            isDarkMode
              ? "text-white hover:cursor-pointer flex hover:text-white"
              : "text-black hover:cursor-pointer flex hover:text-black"
          }`}
          onClick={() => {
            setNavContentDefault(1);
          }}
        >
          <RedditOutlined className="text-3xl" />
          <p className="hidden text-xl font-bold ml-2 sm:block">SLearningLab</p>
        </Link>
      </div>
      <Menu
        className="mt-5"
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={onClick}
        selectedKeys={[navValue]}
      />
    </Sider>
  );
};

export default HomeNavigation;
