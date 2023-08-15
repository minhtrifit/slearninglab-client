import { useState } from "react";
import { Input, InputNumber } from "antd";
import { v4 } from "uuid";

interface PropType {
  Form: any;
  name: any;
  restField: any;
  questionAmount: number;
}

const ExamAnswerAmount = (props: PropType) => {
  const { Form, name, restField } = props;

  const [answerAmountArray, setAnswerAmountArray] = useState<any[]>([]);

  const handleChangeAnswerAmount = (e: any) => {
    if (!answerAmountArray.includes(e) && e > 0) {
      setAnswerAmountArray((oldArray: any) => [...oldArray, e]);
    } else {
      if (e > 0) {
        setAnswerAmountArray(
          answerAmountArray.filter((item) => {
            return item !== e;
          })
        );
      } else if (e === 0) setAnswerAmountArray([]);
    }
  };

  return (
    <div className="lg:w-[500px]">
      <Form.Item
        {...restField}
        name={[name, "amount"]}
        label="Số câu trả lời"
        rules={[{ type: "number", min: 2, required: true }]}
      >
        <InputNumber
          onChange={(e: any) => {
            handleChangeAnswerAmount(e);
          }}
        />
      </Form.Item>
      {answerAmountArray.map((item: any) => {
        const uid = v4();

        return (
          <Form.Item
            key={uid}
            {...restField}
            name={[name, `ans${item}`]}
            label="Nội dung câu trả lời"
            rules={[{ required: true, message: "Thiếu nội dung câu hỏi" }]}
          >
            <Input />
          </Form.Item>
        );
      })}
      {answerAmountArray.length !== 0 && (
        <Form.Item
          {...restField}
          name={[name, "correct"]}
          label="Đáp án"
          rules={[{ required: true, message: "Thiếu nội dung đáp án" }]}
        >
          <Input />
        </Form.Item>
      )}
    </div>
  );
};

export default ExamAnswerAmount;
