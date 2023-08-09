import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Space } from "antd";

import CreateClassModal from "./CreateClassModal";

const HomeClasses = () => {
  const [openCreateClassModal, setOpenCreateClassModal] =
    useState<boolean>(false);

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);

  const showCreateClassModal = () => {
    setOpenCreateClassModal(true);
  };

  return (
    <div className="min-h-[1000px]">
      <CreateClassModal
        openCreateClassModal={openCreateClassModal}
        setOpenCreateClassModal={setOpenCreateClassModal}
      />
      <Space size="large" className="flex justify-end">
        {roles.includes("teacher") && (
          <Button
            type="primary"
            onClick={() => {
              showCreateClassModal();
            }}
          >
            Tạo lớp học
          </Button>
        )}
      </Space>
    </div>
  );
};

export default HomeClasses;
