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
  getClassCanJoinByUsername,
  getClassJoinedByUsername,
} from "../redux/reducers/class.reducer";
import { ClassroomType } from "../types/class.type";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

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
              <>
                <p className="text-2xl font-bold mt-10">
                  Danh sách lớp học của bạn:
                </p>
                <p className="text-sm mt-5">
                  Trượt sang ngang để xem danh sách lớp học:
                </p>
              </>
            )}
            {roles.includes("student") && (
              <>
                <p className="text-2xl font-bold mt-6 mb-8">
                  Danh sách lớp học đã đăng ký:
                </p>
                <p className="text-sm">
                  Trượt sang ngang để xem danh sách lớp học:
                </p>
              </>
            )}
            {roles.includes("student") && studentJoinedList.length === 0 && (
              <Empty description="Bạn chưa đăng ký lớp học nào" />
            )}
            {roles.includes("teacher") && teacherClassList.length === 0 && (
              <Empty description="Bạn chưa tạo lớp học nào" />
            )}
            {roles.includes("student") && isGettingClass ? (
              <div className="my-16">
                <LoadingCpm />
              </div>
            ) : (
              roles.includes("student") && (
                <Space
                  size="large"
                  className="my-10 flex justify-center w-[100%]"
                >
                  {studentJoinedList.length !== 0 && (
                    <Swiper
                      // slidesPerView={1}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      modules={[Pagination]}
                      className="w-[300px] h-[420px] md:w-[550px] lg:w-[800px]"
                    >
                      {studentJoinedList.map((value: ClassroomType) => {
                        return (
                          <SwiperSlide
                            key={value?.id}
                            className="flex justify-center items-center"
                          >
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
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}
                  {/* {studentJoinedList.length !== 0 &&
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
                    })} */}
                </Space>
              )
            )}
            {roles.includes("student") && (
              <>
                <p className="text-2xl font-bold my-6">
                  Danh sách lớp học có thể đăng ký:
                </p>
                <p className="text-sm">
                  Trượt sang ngang để xem danh sách lớp học:
                </p>
              </>
            )}
            {roles.includes("student") && studentClassList.length === 0 && (
              <Empty description="Không có lớp học để đăng ký" />
            )}
            {roles.includes("teacher") && isGettingClass ? (
              <div className="my-10">
                <LoadingCpm />
              </div>
            ) : (
              roles.includes("teacher") && (
                <Space
                  size="large"
                  className="my-10 flex justify-center w-[100%]"
                >
                  {teacherClassList.length !== 0 && (
                    <Swiper
                      // slidesPerView={1}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      modules={[Pagination]}
                      className="w-[300px] h-[420px] md:w-[550px] lg:w-[800px]"
                    >
                      {teacherClassList.map((value: ClassroomType) => {
                        return (
                          <SwiperSlide
                            key={value?.id}
                            className="flex justify-center items-center"
                          >
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
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}
                  {/* {teacherClassList.length !== 0 &&
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
                    })} */}
                </Space>
              )
            )}
            {roles.includes("student") && isGettingClass ? (
              <div className="my-16">
                <LoadingCpm />
              </div>
            ) : (
              roles.includes("student") && (
                <Space
                  size="large"
                  className="my-12 flex justify-center w-[100%]"
                >
                  {studentJoinedList.length !== 0 && (
                    <Swiper
                      // slidesPerView={1}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      modules={[Pagination]}
                      className="w-[300px] h-[420px] md:w-[550px] lg:w-[800px]"
                    >
                      {studentClassList.map((value: ClassroomType) => {
                        return (
                          <SwiperSlide
                            key={value?.id}
                            className="flex justify-center items-center"
                          >
                            <ClassJoinCard
                              id={value?.id}
                              className={value?.className}
                              teacherUsername={value?.teacherUsername}
                              amount={value?.amount}
                              img={value?.img}
                              subject={value?.subject}
                              introduction={value?.introduction}
                              dateCreated={value?.dateCreated}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}
                  {/* {studentClassList.length !== 0 &&
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
                    })} */}
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
