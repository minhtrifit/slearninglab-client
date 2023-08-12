import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { Button, Empty, Space } from "antd";
import { Route, Routes } from "react-router-dom";

import CreateClassModal from "./CreateClassModal";
import LoadingCpm from "./LoadingCpm";
import ClassCard from "./ClassCard";
import ClassJoinCard from "./ClassJoinCard";
import ClassPage from "../pages/ClassPage";

import {
  getClassByUsername,
  getAllClasses,
  getClassJoinedByUsername,
} from "../redux/reducers/class.reducer";
import { ClassroomType } from "../types/class.type";

const HomeClasses = () => {
  const [openCreateClassModal, setOpenCreateClassModal] =
    useState<boolean>(false);

  const dispatchAsync = useAppDispatch();

  const roles = useSelector<RootState, string[]>((state) => state.user.roles);
  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );
  const isGettingClass = useSelector<RootState, boolean>(
    (state) => state.class.isGettingClass
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
      dispatchAsync(getAllClasses());
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
              <p className="text-2xl font-bold">Danh sách lớp học của bạn:</p>
            )}
            {roles.includes("student") && (
              <p className="text-2xl font-bold mt-6 mb-16">
                Danh sách lớp học đã đăng ký:
              </p>
            )}
            {roles.includes("student") && studentJoinedList.length === 0 && (
              <Empty description="Bạn chưa đăng ký lớp học nào" />
            )}
            {roles.includes("student") && isGettingClass ? (
              <div className="my-16">
                <LoadingCpm />
              </div>
            ) : (
              roles.includes("student") && (
                <Space size="large" className="my-16 flex flex-wrap">
                  {studentJoinedList.length !== 0 &&
                    studentJoinedList.map((value: ClassroomType, index) => {
                      return (
                        <ClassCard
                          key={index + 98079798}
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
              )
            )}
            {roles.includes("student") && (
              <p className="text-2xl font-bold my-6">
                Danh sách lớp học có thể đăng ký:
              </p>
            )}
            {roles.includes("teacher") && isGettingClass ? (
              <div className="my-10">
                <LoadingCpm />
              </div>
            ) : (
              roles.includes("teacher") && (
                <Space size="large" className="my-10 flex flex-wrap">
                  {teacherClassList.length !== 0 &&
                    teacherClassList.map((value: ClassroomType) => {
                      return (
                        <ClassCard
                          key={value?.id}
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
              )
            )}
            {roles.includes("student") && isGettingClass ? (
              <div className="my-16">
                <LoadingCpm />
              </div>
            ) : (
              roles.includes("student") && (
                <Space size="large" className="my-16 flex flex-wrap">
                  {studentClassList.length !== 0 &&
                    studentClassList.map((value: ClassroomType) => {
                      return (
                        <ClassJoinCard
                          key={value?.id}
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
              )
            )}
          </div>
        }
      />
      <Route path="/:id" element={<ClassPage />} />
    </Routes>
  );
};

export default HomeClasses;
