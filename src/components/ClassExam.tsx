import { useState } from "react";
import { Button, Space } from "antd";

import CreateExamModal from "./CreateExamModal";

const ClassExam = () => {
  const [openExamModal, setOpenExamModal] = useState(false);

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
        <Button
          type="primary"
          onClick={() => {
            showCreateExamModal();
          }}
        >
          Tạo bài thi
        </Button>
      </Space>
    </div>
  );
};

export default ClassExam;
