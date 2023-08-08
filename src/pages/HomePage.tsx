import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { useTitle } from "../hooks/useTitle";
import { RootState } from "../redux/store";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Layout, MenuProps, theme, ConfigProvider, Switch } from "antd";

import { logoutAccount } from "../redux/actions/user.action";

import HomeDashboard from "../components/HomeDashboard";
import HomeClasses from "../components/HomeClasses";
import HomeNavigation from "../components/HomeNavigation";
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";

const { Header, Content, Footer, Sider } = Layout;

const navLabel = ["Trang chủ", "Lớp học"];

const items: MenuProps["items"] = [HomeOutlined, AppstoreOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: navLabel[index],
  })
);

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState<any>();
  const [navContentDefault, setNavContentDefault] = useState<number>(1);

  const dispath = useDispatch();
  const dispathAsync = useAppDispatch();
  const navigate = useNavigate();

  useTitle("Slearninglab | Trang chủ");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isLogin = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLogin
  );

  const name = useSelector<RootState, string>((state) => state.user.name);

  // Navigation content event
  useEffect(() => {
    setNavContentDefault(1);
  }, []);

  // Night mode event
  useEffect(() => {
    const checkMode: string | null = sessionStorage.getItem("mode");
    if (checkMode !== null) {
      const myBool = checkMode.toLowerCase() === "true";
      setIsDarkMode(myBool);
    } else {
      sessionStorage.setItem("mode", "false");
      setIsDarkMode(false);
    }
  }, []);

  const switchMode = (_checked: boolean) => {
    setIsDarkMode(!isDarkMode);
    sessionStorage.setItem("mode", JSON.stringify(!isDarkMode));
  };

  const onClick: MenuProps["onClick"] = (e: any) => {
    if (e.domEvent.target.textContent === "Trang chủ") {
      navigate("/home");
      document.title = "Slearninglab | Trang chủ";
    }
    if (e.domEvent.target.textContent === "Lớp học") {
      navigate("/home/classes");
      document.title = "Slearninglab | Lớp học";
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (e.key === "logout") {
      dispath(logoutAccount());
    }
  };

  return (
    <>
      {isLogin ? (
        <ConfigProvider
          theme={{
            algorithm: isDarkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          }}
        >
          <Layout hasSider>
            <HomeNavigation
              Sider={Sider}
              isDarkMode={isDarkMode}
              navContentDefault={navContentDefault}
              items={items}
              onClick={onClick}
            />
            <Layout
              className={`${
                isDarkMode
                  ? "ml-[80px] sm:ml-[200px] bg-zinc-900"
                  : "ml-[80px] sm:ml-[200px]"
              }`}
            >
              <HomeHeader
                Header={Header}
                isDarkMode={isDarkMode}
                colorBgContainer={colorBgContainer}
                Switch={Switch}
                switchMode={switchMode}
                name={name}
                onClick={handleMenuClick}
              />
              <Content style={{ margin: "24px 20px 0", overflow: "initial" }}>
                <div
                  className={`${isDarkMode ? "bg-zinc-800" : ""}`}
                  style={{
                    padding: 24,
                    color: isDarkMode ? "#fff" : undefined,
                    background: !isDarkMode ? colorBgContainer : undefined,
                  }}
                >
                  <Routes>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/classes/*" element={<HomeClasses />} />
                  </Routes>
                </div>
              </Content>
              <HomeFooter isDarkMode={isDarkMode} Footer={Footer} />
            </Layout>
          </Layout>
        </ConfigProvider>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default HomePage;
