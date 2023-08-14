import { useState } from "react";
import { Button, Form, Input, Space, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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
    console.log("Received values of form:", values);

    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpenExamModal(false);
    //   setConfirmLoading(false);
    // }, 2000);
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
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        label="Nội dung câu hỏi"
                        rules={[
                          { required: true, message: "Thiếu nội dung câu hỏi" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
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
