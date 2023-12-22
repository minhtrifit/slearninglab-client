import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { Button, Empty, Space } from "antd";
import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";

import CreateClassModal from "./CreateClassModal";
import LoadingCpm from "./LoadingCpm";
import ClassCard from "./ClassCard";
import ClassJoinCard from "./ClassJoinCard";
import ClassPage from "../pages/ClassPage";

import {
  getClassByUsername,
  getClassCanJoinByUsername,
  getClassJoinedByUsername,
} from "../redux/reducers/class.reducer";
import { ClassroomType } from "../types/class.type";

const HomeClasses = () => {
  const [openCreateClassModal, setOpenCreateClassModal] =
    useState<boolean>(false);

  const dispatchAsync = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);
  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );
  const isGettingClass = useSelector<RootState, boolean>(
    (state) => state.class.isGettingClass
  );
  const isGettingJoined = useSelector<RootState, boolean>(
    (state) => state.class.isGettingJoined
  );
  const teacherClassList = useSelector<RootState, ClassroomType[]>(
    (state) => state.class.teacherClassList
  );
  const studentClassList = useSelector<RootState, ClassroomType[]>(
    (state) => state.class.studentClassList
  );
  const studentJoinedList = useSelector<RootState, ClassroomType[]>(
    (state) => state.class.studentJoinedList
  );

  const showCreateClassModal = () => {
    setOpenCreateClassModal(true);
  };

  useEffect(() => {
    if (roles.includes("teacher")) {
      dispatchAsync(getClassByUsername(username));
    }
    if (roles.includes("student")) {
      dispatchAsync(getClassCanJoinByUsername(username));
      dispatchAsync(getClassJoinedByUsername(username));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-[900px]">
            <CreateClassModal
              openCreateClassModal={openCreateClassModal}
              setOpenCreateClassModal={setOpenCreateClassModal}
            />
            {roles.includes("teacher") && (
              <Space size="large" className="flex justify-end">
                <Button
                  type="primary"
                  onClick={() => {
                    showCreateClassModal();
                  }}
                >
                  Tạo lớp học
                </Button>
              </Space>
            )}

            {roles.includes("teacher") && (
              <p className="text-2xl font-bold mt-10">
                Danh sách lớp học của bạn:
              </p>
            )}

            {roles.includes("student") && (
              <p className="text-2xl font-bold mt-6 mb-8">
                Danh sách lớp học đã đăng ký
              </p>
            )}

            {roles.includes("student") && studentJoinedList.length == 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Bạn chưa đăng ký lớp học nào"
              />
            )}

            {roles.includes("teacher") && teacherClassList.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Bạn chưa tạo lớp học nào"
              />
            )}

            {roles.includes("student") && isGettingJoined && (
              <div className="my-16">
                <LoadingCpm />
              </div>
            )}

            {roles.includes("student") &&
              !isGettingJoined &&
              studentJoinedList.length !== 0 && (
                <Space
                  size="large"
                  className="overflow-x-auto my-12 flex w-[100%] pb-4"
                >
                  {studentJoinedList.map((value: ClassroomType) => {
                    const uid = v4();
                    return (
                      <ClassCard
                        key={uid}
                        id={value?.id}
                        className={value?.className}
                        teacherUsername={value?.teacherUsername}
                        amount={value?.amount}
                        img={value?.img}
                        subject={value?.subject}
                        introduction={value?.introduction}
                        dateCreated={value?.dateCreated}
                      />
                    );
                  })}
                </Space>
              )}

            {roles.includes("student") && (
              <p className="text-2xl font-bold my-6">
                Danh sách lớp học có thể đăng ký
              </p>
            )}

            {roles.includes("student") &&
              !isGettingJoined &&
              studentClassList.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Không có lớp học để đăng ký"
                />
              )}

            {roles.includes("teacher") && isGettingClass && (
              <div className="my-10">
                <LoadingCpm />
              </div>
            )}

            {roles.includes("teacher") &&
              !isGettingClass &&
              teacherClassList.length !== 0 && (
                <Space
                  size="large"
                  className="overflow-x-auto my-12 flex w-[100%] pb-4"
                >
                  {teacherClassList.map((value: ClassroomType) => {
                    return (
                      <ClassCard
                        id={value?.id}
                        className={value?.className}
                        teacherUsername={value?.teacherUsername}
                        amount={value?.amount}
                        img={value?.img}
                        subject={value?.subject}
                        introduction={value?.introduction}
                        dateCreated={value?.dateCreated}
                      />
                    );
                  })}
                </Space>
              )}

            {roles.includes("student") && isGettingJoined && (
              <div className="my-16">
                <LoadingCpm />
              </div>
            )}

            {roles.includes("student") &&
              !isGettingJoined &&
              studentClassList.length !== 0 && (
                <Space
                  size="large"
                  className="overflow-x-auto my-12 flex w-[100%] pb-4"
                >
                  {studentClassList.map((value: ClassroomType) => {
                    const uid = v4();
                    return (
                      <ClassJoinCard
                        key={uid}
                        id={value?.id}
                        className={value?.className}
                        teacherUsername={value?.teacherUsername}
                        amount={value?.amount}
                        img={value?.img}
                        subject={value?.subject}
                        introduction={value?.introduction}
                        dateCreated={value?.dateCreated}
                      />
                    );
                  })}
                </Space>
              )}
          </div>
        }
      />
      <Route path="/:id" element={<ClassPage />} />
    </Routes>
  );
};

export default HomeClasses;
