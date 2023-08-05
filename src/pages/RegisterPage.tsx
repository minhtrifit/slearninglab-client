import React, { useEffect } from "react";
import { Form, Select, Space } from "antd";
import { useTitle } from "../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConfirmEmailType, UserAccountType } from "../types/user.type";

import { registerAccount } from "../redux/reducers/user.reducer";
import { confirmEmailRegister } from "../redux/reducers/user.reducer";

import RegisterAccount from "../components/RegisterAccount";
import Loading from "../components/Loading";
import ConfirmEmailCode from "../components/ConfirmEmailCode";

const { Option } = Select;

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

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dispathAsync = useAppDispatch();

  useTitle("Slearninglab | Đăng ký tài khoản");

  const isLoading = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLoading
  );

  const code = useSelector<RootState, string | undefined>(
    (state) => state.user.code
  );

  const checkCode = useSelector<RootState, string | undefined | any>(
    (state) => state.user.checkCode
  );

  useEffect(() => {
    if (code !== "" && checkCode != "") {
      console.log(code, checkCode);
      localStorage.setItem("code", JSON.stringify(code));
      localStorage.setItem("checkCode", JSON.stringify(checkCode));
    }
  }, [code, checkCode]);

  useEffect(() => {
    if (sessionStorage.getItem("register_account")) {
      toast.success("Đăng ký tài khoản thành công");
      sessionStorage.removeItem("register_account");
    }
  }, []);

  const registerAccountSubmit = async (values: any) => {
    // console.log("Received values of form: ", values);

    const accountData: UserAccountType = {
      username: values.username,
      password: values.password,
      email: values.email,
      name: values.name,
      roles: [values.role],
    };

    const promise = dispathAsync(registerAccount(accountData));

    promise.unwrap().catch((err) => {
      console.log("Check err:", err);
      toast.error(err?.response?.data?.message);
    });
  };

  const confirmEmailCode = async (values: any) => {
    // console.log("Received values of form: ", values);

    const checkCode = localStorage
      .getItem("checkCode")
      ?.toString()
      .replace(/^"(.*)"$/, "$1");

    console.log(checkCode);

    const emailCodeData: ConfirmEmailType = {
      code: values.email_code,
      checkCode: checkCode,
    };

    const promise = dispathAsync(confirmEmailRegister(emailCodeData));

    promise.unwrap().catch((err) => {
      console.log("Check err:", err);
      toast.error("Xác thực tài khoản thất bại");
    });
  };

  return (
    <Space
      direction="horizontal"
      size="large"
      className="my-32 mx-auto min-h-[500px] w-[90%] flex flex-row border-solid border-2 border-blue-200 rounded sm:justify-center md:w-[50%] xl:w-[90%] 2xl:justify-around 2xl:w-[70%]"
    >
      <ToastContainer position="bottom-left" theme="colored" />
      {isLoading ? (
        <Loading />
      ) : code === "" ? (
        <RegisterAccount
          formItemLayout={formItemLayout}
          form={form}
          onFinish={registerAccountSubmit}
          Option={Option}
          tailFormItemLayout={tailFormItemLayout}
        />
      ) : (
        <ConfirmEmailCode
          formItemLayout={formItemLayout}
          form={form}
          onFinish={confirmEmailCode}
          tailFormItemLayout={tailFormItemLayout}
        />
      )}
      <div className="hidden xl:block xl:h-[500px]">
        <img
          src="../banner/register.jpg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </Space>
  );
};

export default RegisterPage;
