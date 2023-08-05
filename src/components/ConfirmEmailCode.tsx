import { Button, Form, Input, Space } from "antd";

interface PropType {
  formItemLayout: any;
  form: any;
  onFinish: any;
  tailFormItemLayout: any;
}

const ConfirmEmailCode = (props: PropType) => {
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
      <p className="text-3xl text-center my-10 font-bold text-sky-400">
        NHẬP MÃ XÁC THỰC:
      </p>

      <Form.Item
        name="email_code"
        label="Mã xác thực"
        rules={[
          {
            required: true,
            message: "Vui lòng mã xác thực",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ConfirmEmailCode;
