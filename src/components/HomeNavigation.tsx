import { Menu, MenuProps } from "antd";

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
      <div className="demo-logo-vertical" />
      <Menu
        className="mt-16"
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
