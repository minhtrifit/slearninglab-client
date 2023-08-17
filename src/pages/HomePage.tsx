import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { useTitle } from "../hooks/useTitle";
import { useSocket } from "../hooks/useSocket";
import { StartListeners, SendHandshake } from "../helpers/socket";
import { RootState } from "../redux/store";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Layout, MenuProps, theme, ConfigProvider, Switch } from "antd";
import { ToastContainer, toast } from "react-toastify";

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

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  useTitle("Slearninglab | Trang chủ");

  const socket = useSocket(import.meta.env.VITE_API_URL, {
    autoConnect: false,
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isLogin = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLogin
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );
  const name = useSelector<RootState, string>((state) => state.user.name);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", function (e) {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   });
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   const createClass = sessionStorage.getItem("createClass");
  //   if (createClass === "true") {
  //     toast.success("Tạo lớp học thành công");
  //   } else if (createClass === "false") {
  //     toast.error("Tạo lớp học thất bại");
  //   }

  //   setTimeout(() => {
  //     sessionStorage.removeItem("createClass");
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const createClass = sessionStorage.getItem("createExam");
    if (createClass === "true") {
      toast.success("Tạo bài thi thành công");
      navigate("/home/classes");
    } else if (createClass === "false") {
      toast.error("Tạo bài thi thất bại");
      navigate("/home/classes");
    }

    setTimeout(() => {
      sessionStorage.removeItem("createExam");
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Socket event
  useEffect(() => {
    socket.connect();
    dispatch({ type: "update_socket", payload: socket });

    // Listen event to socket
    StartListeners(socket, dispatch);

    // Send event to socket
    SendHandshake(socket, username);

    // eslint-disable-next-line
  }, []);

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
      setNavContentDefault(1);
    }
    if (e.domEvent.target.textContent === "Lớp học") {
      navigate("/home/classes");
      document.title = "Slearninglab | Lớp học";
      setNavContentDefault(2);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (e.key === "logout") {
      dispatch(logoutAccount());
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" theme="colored" />
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
              setNavContentDefault={setNavContentDefault}
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
