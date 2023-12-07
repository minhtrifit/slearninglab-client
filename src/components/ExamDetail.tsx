import { Dispatch, SetStateAction } from "react";
import { Modal, Button, Space, Image } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { v4 } from "uuid";

import { ExamType } from "../types/exam.type";

import LoadingCpm from "./LoadingCpm";

interface PropType {
  openDetailModal: boolean;
  setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
}

const ExamDetail = (props: PropType) => {
  const { openDetailModal, setOpenDetailModal } = props;

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.exam.isLoading
  );

  const detailExam = useSelector<RootState, ExamType | undefined>(
    (state) => state.exam.detailExam
  );

  return (
    <Modal
      title={`Chi tiết bài thi: ${detailExam?.exam.examName}`}
      style={{ top: 50 }}
      width={900}
      open={openDetailModal}
      onCancel={() => setOpenDetailModal(false)}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenDetailModal(false);
          }}
        >
          Thoát
        </Button>,
      ]}
    >
      {isLoading ? (
        <div className="mt-10">
          <LoadingCpm />
        </div>
      ) : (
        <Space className="my-10 flex flex-col items-start">
          <p>Mã bài thi: {detailExam?.exam.id}</p>
          <p>Thời gian làm bài: {detailExam?.exam.time} phút</p>
          <p className="my-3 font-bold text-red-500">Danh sách câu hỏi:</p>
          {detailExam?.question.map((question, index) => {
            const uid = v4();
            return (
              <Space key={uid} className="flex flex-col mb-5 items-start">
                <p className="font-bold text-sky-500">
                  Câu hỏi {index + 1}: {question.title}
                </p>
                {question.img.length !== 0 && (
                  <Space>
                    {question.img.map((img) => {
                      const uid2 = v4();

                      return <Image key={uid2} width={200} src={img} />;
                    })}
                  </Space>
                )}
                {question.ans.map((ans, index) => {
                  const uid2 = v4();

                  return (
                    <Space key={uid2}>
                      <p>
                        Câu trả lời {index + 1}: {ans}
                      </p>
                    </Space>
                  );
                })}
                <p className="font-bold text-green-500 mt-5">
                  Đáp án: {question.correct}
                </p>
              </Space>
            );
          })}
        </Space>
      )}
    </Modal>
  );
};

export default ExamDetail;
