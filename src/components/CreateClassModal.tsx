import { useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ClassroomType } from "../types/class.type";

import {
  createClassroom,
  getClassByUsername,
} from "../redux/reducers/class.reducer";

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

  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [className, setClassName] = useState<any>();
  const [classAmount, setClassAmount] = useState<any>();
  const [classIntro, setClassIntro] = useState<any>();

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const onFinish = async (values: any) => {
    console.log(values);
    const img = classImage[Math.floor(Math.random() * classImage.length)];

    const classData: ClassroomType = {
      teacherUsername: username,
      className: values.class.classname,
      amount: values.class.amount,
      subject: values.class.subject,
      introduction: values.class.introduction,
      img: img,
      dateCreated: new Date(new Date().getTime()),
    };

    console.log(classData);

    setClassName("");
    setClassAmount("");
    setClassIntro("");

    setConfirmLoading(true);

    const rs = await dispatchAsync(createClassroom(classData));

    if (rs.type === "user/register_account/rejected") {
      // sessionStorage.setItem("createClass", "false");
      toast.error("Tạo lớp học thất bại");
    } else {
      // sessionStorage.setItem("createClass", "true");
      toast.success("Tạo lớp học thành công");
      dispatchAsync(getClassByUsername(username));
    }

    setOpenCreateClassModal(false);
    setConfirmLoading(false);
    navigate("/home/classes");
    // window.location.reload();
  };

  const handleCancel = () => {
    setOpenCreateClassModal(false);
  };

  return (
    <>
      {/* <ToastContainer position="bottom-left" theme="colored" /> */}
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
                  value: "Toán học",
                  label: "Toán học",
                },
                {
                  value: "Văn học",
                  label: "Văn học",
                },
                {
                  value: "Ngoại ngữ",
                  label: "Ngoại ngữ",
                },
                {
                  value: "Tin học",
                  label: "Tin học",
                },
                {
                  value: "Vật lý",
                  label: "Vật lý",
                },
                {
                  value: "Hóa học",
                  label: "Hóa học",
                },
                {
                  value: "Sinh học",
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
