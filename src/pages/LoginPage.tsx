import React, { useEffect } from "react";
import { Form, Space } from "antd";
import { useTitle } from "../hooks/useTitle";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginAccountType } from "../types/user.type";

import { loginAccount } from "../redux/reducers/user.reducer";
import { handleAccessToken } from "../redux/reducers/user.reducer";

import LoginAccount from "../components/LoginAccount";
import Loading from "../components/Loading";

import { axiosInterReq, axiosInterRes } from "../helpers/axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispathAsync = useAppDispatch();
  const navigate = useNavigate();

  axiosInterReq;
  axiosInterRes;

  useTitle("Slearninglab | Đăng nhập");

  const isLoading = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLoading
  );

  const isLogin = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLogin
  );

  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    dispathAsync(handleAccessToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginAccountSubmit = async (values: any) => {
    // console.log("Received values of form: ", values);

    const accountData: LoginAccountType = {
      username: values.username,
      password: values.password,
    };

    const promise = dispathAsync(loginAccount(accountData));

    promise.unwrap().catch((err) => {
      console.log("Check err:", err);
      toast.error(err?.response?.data?.message);
    });
  };

  return (
    <div className="min-h-screen bg-left py-32 bg-[url('/background/bg1.jpg')]">
      <Space
        direction="horizontal"
        size="large"
        className="bg-sky-50 mx-auto min-h-[600px] w-[90%] flex flex-row border-solid border-2 border-blue-200 rounded sm:justify-center md:w-[50%] xl:w-[90%] 2xl:justify-around 2xl:w-[70%]"
      >
        <ToastContainer position="bottom-left" theme="colored" />

        {isLoading ? (
          <Loading />
        ) : (
          <LoginAccount
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
            form={form}
            onFinish={loginAccountSubmit}
          />
        )}

        <div className="hidden xl:block xl:h-[500px]">
          <img
            src="../banner/register.jpg"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Space>
    </div>
  );
};

export default LoginPage;
