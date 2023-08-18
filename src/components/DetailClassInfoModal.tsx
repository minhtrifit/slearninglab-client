import React, { useState } from "react";
import { Button, Modal, Space } from "antd";

import { ClassroomType } from "../types/class.type";

import { reformatDate } from "../helpers/transform";

interface PropType {
  isModalOpen: boolean;
  setIsModalOpen: any;
  detailClassInfo: ClassroomType | undefined;
}

const DetailClassInfoModal = (props: PropType) => {
  const { isModalOpen, setIsModalOpen, detailClassInfo } = props;

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Thông tin lớp học"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" type="primary" onClick={handleCancel}>
          Đồng ý
        </Button>,
      ]}
    >
      {detailClassInfo === undefined ? (
        <p>Vui lòng tham gia lớp học để xem thông tin chi tiết</p>
      ) : (
        <Space className="flex flex-col items-start my-10">
          <p>Tên lớp học: {detailClassInfo?.className}</p>
          <p>Môn học: {detailClassInfo?.subject}</p>
          <p>Giáo viên: {detailClassInfo?.teacherUsername}</p>
          <p>Số lượng tham gia: {detailClassInfo?.amount} người</p>
          <p>
            Ngày tạo:{" "}
            {detailClassInfo?.dateCreated &&
              reformatDate(
                detailClassInfo?.dateCreated
                  .toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                  .split("T")[0]
              )}
          </p>
          <p>Giới thiệu: {detailClassInfo?.introduction}</p>
        </Space>
      )}
    </Modal>
  );
};

export default DetailClassInfoModal;
