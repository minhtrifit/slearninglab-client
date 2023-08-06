import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";

interface PropType {
  formItemLayout: any;
  form: any;
  onFinish: any;
  tailFormItemLayout: any;
}

const LoginAccount = (props: PropType) => {
  const { formItemLayout, form, onFinish, tailFormItemLayout } = props;

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="p-6 md:w-[500px]"
      scrollToFirstError
    >
      <p className="text-2xl sm:text-3xl sm:ml-24 text-center my-10 font-bold text-sky-400">
        ĐĂNG NHẬP
      </p>

      <Form.Item
        name="username"
        label="Tên tài khoản"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên tài khoản",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Space>
          <Link to="/auth/register">
            <Button type="primary" danger htmlType="button">
              Đăng ký
            </Button>
          </Link>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginAccount;
