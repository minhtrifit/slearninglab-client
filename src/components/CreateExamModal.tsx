import { useState } from "react";
import { Button, Form, Input, Space, Modal, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import ExamUpload from "./ExamUpload";
import ExamAnswerAmount from "./ExamAnswerAmount";

interface PropType {
  openExamModal: boolean;
  setOpenExamModal: any;
  showCreateExamModal: any;
}

const CreateExamModal = (props: PropType) => {
  const { openExamModal, setOpenExamModal } = props;

  const [questionAmount, setQuestionAmount] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = (values: any) => {
    // eslint-disable-next-line no-var
    for (var i = 0; i < values.questions.length; ++i) {
      values.questions[i].image = values.questions[i].image.fileList;
    }

    console.log("Received values of form:", values);

    if (values?.questions?.length === 0) toast.error("Vui lòng nhập câu hỏi");
    else {
      // setConfirmLoading(true);
      // setTimeout(() => {
      //   setOpenExamModal(false);
      //   setConfirmLoading(false);
      // }, 2000);
    }
  };

  const handleCancel = () => {
    setOpenExamModal(false);
  };

  return (
    <>
      <Modal
        title="Tạo bài thi"
        open={openExamModal}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
        ]}
      >
        <Form
          className="w-[60%] mx-auto"
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          //   style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item
            name={["exam", "name"]}
            label="Tên bài thi"
            rules={[{ required: true, message: "Thiếu tên bài thi" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["exam", "time"]}
            label="Thời gian làm bài (phút)"
            rules={[{ type: "number", min: 1, required: true }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                    className="my-10"
                  >
                    <Space className="flex flex-col items-start">
                      <p className="text-md font-bold">Câu hỏi {name + 1}:</p>
                      <Form.Item
                        className="lg:w-[500px]"
                        {...restField}
                        name={[name, "title"]}
                        label="Nội dung câu hỏi"
                        rules={[
                          { required: true, message: "Thiếu nội dung câu hỏi" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <ExamUpload
                        Form={Form}
                        name={name}
                        restField={restField}
                      />
                      <ExamAnswerAmount
                        Form={Form}
                        name={name}
                        restField={restField}
                        questionAmount={questionAmount}
                      />
                    </Space>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                        setQuestionAmount((prevCount) => prevCount - 1);
                      }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      setQuestionAmount((prevCount) => prevCount + 1);
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm câu hỏi
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateExamModal;
