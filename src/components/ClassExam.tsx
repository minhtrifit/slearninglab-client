import { useState, useEffect } from "react";
import { Button, Space, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";

import CreateExamModal from "./CreateExamModal";

import { ClassroomType } from "../types/class.type";
import { ExamInfo } from "../types/exam.type";

import { getExamByClassId } from "../redux/reducers/exam.reducer";
import ExamList from "./ExamList";

const ClassExam = () => {
  const [openExamModal, setOpenExamModal] = useState(false);

  const dispatchAsync = useAppDispatch();

  const detailClass = useSelector<RootState, ClassroomType | null>(
    (state) => state.class.detailClass
  );

  const examList = useSelector<RootState, ExamInfo[]>(
    (state) => state.exam.examList
  );

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  useEffect(() => {
    if (detailClass?.id) dispatchAsync(getExamByClassId(detailClass?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailClass?.id]);

  const showCreateExamModal = () => {
    setOpenExamModal(true);
  };

  return (
    <div>
      <CreateExamModal
        openExamModal={openExamModal}
        setOpenExamModal={setOpenExamModal}
        showCreateExamModal={showCreateExamModal}
      />
      <Space className="w-[100%] flex justify-end">
        {roles.includes("teacher") && (
          <Button
            type="primary"
            onClick={() => {
              showCreateExamModal();
            }}
          >
            Tạo bài thi
          </Button>
        )}
      </Space>
      {examList.length === 0 && (
        <Empty className="mt-20" description="Chưa có bài thi" />
      )}
      {examList.length !== 0 && roles.includes("teacher") && <ExamList />}
    </div>
  );
};

export default ClassExam;
