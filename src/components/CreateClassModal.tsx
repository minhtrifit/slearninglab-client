import { useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";

import { classImage } from "../utils/image";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} là bắt buộc",
  types: {
    number: "${label} không phải là số",
  },
  number: {
    range: "${label} tối thiểu là 2",
  },
};

interface PropType {
  openCreateClassModal: boolean;
  setOpenCreateClassModal: any;
}

const CreateClassModal = (props: PropType) => {
  const { openCreateClassModal, setOpenCreateClassModal } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [className, setClassName] = useState<any>();
  const [classAmount, setClassAmount] = useState<any>();
  const [classIntro, setClassIntro] = useState<any>();

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const onFinish = async (values: any) => {
    const img = classImage[Math.floor(Math.random() * classImage.length)];

    const classData = {
      username: username,
      name: values.class.classname,
      amount: values.class.amount,
      subject: values.class.subject,
      intro: values.class.introduction,
      img: img,
    };

    console.log(classData);

    setClassName("");
    setClassAmount("");
    setClassIntro("");

    setConfirmLoading(true);

    setTimeout(() => {
      setOpenCreateClassModal(false);
      setConfirmLoading(false);
      toast.success("Tạo lớp học thành công");
    }, 2000);
  };

  const handleCancel = () => {
    setOpenCreateClassModal(false);
  };

  return (
    <>
      <ToastContainer position="bottom-left" theme="colored" />
      <Modal
        title="Tạo lớp học"
        open={openCreateClassModal}
        confirmLoading={confirmLoading}
        width={1000}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
        ]}
      >
        <Form
          {...layout}
          className="my-10"
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          fields={[
            {
              name: ["class", "username"],
              value: username,
            },
            {
              name: ["class", "name"],
              value: className,
            },
            {
              name: ["class", "amount"],
              value: classAmount,
            },
            {
              name: ["class", "introduction"],
              value: classIntro,
            },
          ]}
        >
          <Form.Item name={["class", "username"]} label="Tên giáo viên">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["class", "classname"]}
            label="Tên lớp học"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(e) => {
                setClassName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name={["class", "amount"]}
            label="Số lượng thành viên"
            rules={[{ type: "number", min: 2, required: true }]}
          >
            <InputNumber
              onChange={(e) => {
                setClassAmount(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name={["class", "subject"]}
            label="Môn học"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn hoặc tìm kiếm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Toán học",
                },
                {
                  value: "2",
                  label: "Văn học",
                },
                {
                  value: "3",
                  label: "Ngoại ngữ",
                },
                {
                  value: "4",
                  label: "Tin học",
                },
                {
                  value: "5",
                  label: "Vật Lý",
                },
                {
                  value: "6",
                  label: "Hóa học",
                },
                {
                  value: "7",
                  label: "Sinh học",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name={["class", "introduction"]}
            label="Giới thiệu"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              onChange={(e) => {
                setClassIntro(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateClassModal;
