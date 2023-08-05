import React, { useState } from "react";
import { Form, Select, Space } from "antd";
import { useTitle } from "../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";

import { UserAccountType } from "../types/user.type";

import { registerAccount } from "../redux/reducers/user.reducer";

import RegisterAccount from "../components/RegisterAccount";

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

  const onFinish = async (values: any) => {
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
    });
  };

  return (
    <Space
      direction="horizontal"
      size="large"
      className="my-32 mx-auto min-h-[500px] w-[90%] flex flex-row border-solid border-2 border-blue-200 rounded sm:justify-center md:w-[50%] xl:w-[90%] 2xl:justify-around 2xl:w-[70%]"
    >
      <RegisterAccount
        formItemLayout={formItemLayout}
        form={form}
        onFinish={onFinish}
        Option={Option}
        tailFormItemLayout={tailFormItemLayout}
      />
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
