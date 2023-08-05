import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { Link } from "react-router-dom";

interface PropType {
  formItemLayout: any;
  form: any;
  onFinish: any;
  Option: any;
  tailFormItemLayout: any;
}

const RegisterAccount = (props: PropType) => {
  const { formItemLayout, form, onFinish, Option, tailFormItemLayout } = props;

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="p-6 md:w-[500px]"
      scrollToFirstError
    >
      <p className="text-3xl text-center my-10 font-bold text-sky-400">
        ĐĂNG KÝ TÀI KHOẢN
      </p>

      <Form.Item
        name="name"
        label="Họ và tên"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ tên",
          },
        ]}
      >
        <Input />
      </Form.Item>

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
        name="email"
        label="Địa chỉ email"
        rules={[
          {
            type: "email",
            message: "Địa chỉ email không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập địa chỉ email!",
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

      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Vai trò"
        rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
      >
        <Select placeholder="Chọn vai trò">
          <Option value="student">Học sinh</Option>
          <Option value="teacher">Giáo viên</Option>
          {/* <Option value="admin">Quản trị viên</Option> */}
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Tôi đã đọc <a href="">điều khoản người dùng</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Space>
          <Link to="/">
            <Button type="primary" danger htmlType="button">
              Đăng nhập
            </Button>
          </Link>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RegisterAccount;
