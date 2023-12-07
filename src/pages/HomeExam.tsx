import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  ConfigProvider,
  Menu,
  theme,
  Layout,
  Space,
  Button,
  Form,
  Radio,
  Image,
  Card,
} from "antd";
import type { MenuProps } from "antd";
import { RedditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import LoadingCpm from "../components/LoadingCpm";

import HomeFooter from "../components/HomeFooter";
import { useTitle } from "../hooks/useTitle";

import { ExamTypeNonAns, ResultType } from "../types/exam.type";
import { ClassroomType } from "../types/class.type";

import { transformDate } from "../helpers/transform";

import {
  getDetailExamNonAnsById,
  submitExam,
} from "../redux/reducers/exam.reducer";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [];

const HomeExam = () => {
  const [isDarkMode, setIsDarkMode] = useState<any>();
  const formRef = useRef<any>();

  const { id } = useParams();
  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const detailClass = useSelector<RootState, ClassroomType | null>(
    (state) => state.class.detailClass
  );

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.exam.isLoading
  );

  const isSubmitting = useSelector<RootState, boolean>(
    (state) => state.exam.isSubmitting
  );

  const detailExamNonAns = useSelector<RootState, ExamTypeNonAns | undefined>(
    (state) => state.exam.detailExamNonAns
  );

  const getResult = useSelector<RootState, ResultType | undefined>(
    (state) => state.exam.getResult
  );

  useTitle("Slearninglab | Làm bài thi");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Night mode event
  useEffect(() => {
    const checkMode: string | null = sessionStorage.getItem("mode");
    if (checkMode !== null) {
      const myBool = checkMode.toLowerCase() === "true";
      setIsDarkMode(myBool);
    } else {
      sessionStorage.setItem("mode", "false");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      dispatchAsync(getDetailExamNonAnsById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // const switchMode = (_checked: boolean) => {
  //   setIsDarkMode(!isDarkMode);
  //   sessionStorage.setItem("mode", JSON.stringify(!isDarkMode));
  // };

  // Timeout event
  const Completionist = () => {
    alert("Hết giờ làm bài rồi ạ :>>>");
    formRef.current.submit();
    return <></>;
  };

  const handleSubmitExam = async (values: any) => {
    const examSubmitData: any = {
      usernameId: username,
      classId: detailExamNonAns?.exam.classId,
      examId: detailExamNonAns?.exam.id,
      question: [],
    };

    for (const key in values) {
      examSubmitData.question.push({
        questionid: key,
        ans: values[key],
      });
    }

    const rs = await dispatchAsync(submitExam(examSubmitData));

    if (rs.type === "exam/submit_exam/fulfilled") {
      sessionStorage.setItem("examResult", "true");
    } else {
      sessionStorage.setItem("examResult", "false");
      navigate(`/home/classes/${detailClass?.id}`);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout hasSider>
        <Sider
          breakpoint="sm"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: isDarkMode ? undefined : "#fff",
          }}
        >
          <div
            className={`${
              !isDarkMode
                ? "flex justify-center mt-7 text-black"
                : "flex justify-center mt-7 text-white"
            }`}
          >
            <Link
              to="/home"
              className={`${
                isDarkMode
                  ? "text-white hover:cursor-pointer flex hover:text-white"
                  : "text-black hover:cursor-pointer flex hover:text-black"
              }`}
              onClick={() => {}}
            >
              <RedditOutlined className="text-3xl" />
              <p className="hidden text-xl font-bold ml-2 sm:block">
                SLearningLab
              </p>
            </Link>
          </div>
          <Menu
            className="mt-5"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
          <Space className="flex flex-col mt-20">
            {getResult === undefined && (
              <Button
                form="exam-form"
                type="primary"
                // htmlType="submit"
                onClick={() => {
                  const text = "Xác nhận nộp bài ?";
                  if (confirm(text) === true) {
                    formRef.current.submit();
                  }
                }}
              >
                Nộp bài
              </Button>
            )}
            <div
              className={`${
                !isDarkMode
                  ? "text-3xl mt-16 text-black"
                  : "text-3xl mt-16 text-white"
              }`}
            >
              {detailExamNonAns?.exam.time && getResult === undefined && (
                <Countdown
                  date={Date.now() + detailExamNonAns?.exam.time * 60 * 1000}
                  daysInHours={true}
                >
                  <Completionist />
                </Countdown>
              )}
            </div>
          </Space>
        </Sider>
        <Layout
          className={`${
            isDarkMode
              ? "ml-[80px] sm:ml-[200px] bg-zinc-900"
              : "ml-[80px] sm:ml-[200px]"
          }`}
        >
          <Header
            style={{
              background: !isDarkMode ? colorBgContainer : undefined,
            }}
            className="h-28 py-5 px-5 flex flex-col items-start justify-around sm:flex-row sm:items-center sm:justify-between sm:h-20 sm:p-5"
          >
            <Space>
              {/* <Switch
                  checkedChildren="Sáng"
                  unCheckedChildren="Tối"
                  defaultChecked
                  onChange={switchMode}
                /> */}
            </Space>
          </Header>
          <Content style={{ margin: "24px 20px 0", overflow: "initial" }}>
            {isLoading ? (
              <div
                className={`${
                  isDarkMode
                    ? "bg-zinc-800 min-h-[90vh] p-20"
                    : "min-h-[90vh] p-20"
                }`}
              >
                <LoadingCpm />
              </div>
            ) : getResult === undefined ? (
              <div
                className={`${isDarkMode ? "bg-zinc-800" : ""}`}
                style={{
                  minHeight: "85vh",
                  padding: 24,
                  color: isDarkMode ? "#fff" : undefined,
                  background: !isDarkMode ? colorBgContainer : undefined,
                }}
              >
                {isSubmitting ? (
                  <div className="mt-52 flex justify-center">
                    <Loading />
                  </div>
                ) : (
                  <Space className="flex flex-col">
                    <p className="text-center mt-12 text-2xl font-bold">
                      Tên bài thi: {detailExamNonAns?.exam.examName}
                    </p>
                    <p className="text-center mt-5 mb-16 text-xl font-bold">
                      Thời gian: {detailExamNonAns?.exam.time} phút
                    </p>
                    <Form
                      id="exam-form"
                      name="basic"
                      ref={formRef}
                      className="md:w-[600px] lg:w-[900px]"
                      onFinish={(values) => {
                        handleSubmitExam(values);
                      }}
                    >
                      {detailExamNonAns?.question.map((question, index) => {
                        const uid = v4();
                        return (
                          <div key={uid}>
                            <Form.Item
                              key={question.id}
                              name={question.id}
                              className="mb-10"
                            >
                              <Space className="flex flex-col items-start">
                                <p className="text-lg font-bold mb-3">
                                  Câu hỏi {index + 1}: {question.title}
                                </p>
                                {question?.img.length !== 0 && (
                                  <Space
                                    size="middle"
                                    className="flex flex-col lg:flex-row"
                                  >
                                    {question?.img.map((image) => {
                                      const uid2 = v4();
                                      return (
                                        <Image
                                          key={uid2}
                                          width={200}
                                          src={image}
                                        />
                                      );
                                    })}
                                  </Space>
                                )}
                              </Space>
                            </Form.Item>
                            <Form.Item name={question.id}>
                              <Radio.Group>
                                <Space
                                  size="middle"
                                  className="flex flex-col items-start"
                                >
                                  {question?.ans.map((ans, index) => {
                                    const uid3 = v4();
                                    return (
                                      <Radio key={uid3} value={ans}>
                                        Đáp án số {index + 1}: {ans}
                                      </Radio>
                                    );
                                  })}
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        );
                      })}
                    </Form>
                  </Space>
                )}
              </div>
            ) : (
              <div className="min-h-[850px] pt-20 w-[90%] sm:w-[80%] xl:w-[40%] mx-auto">
                <Card title="Kết quả bài thi">
                  <Space className="flex flex-col">
                    <div className="w-[250px] mb-10">
                      <img
                        src="../assets/result.png"
                        alt="result"
                        className="w-[100%]"
                      />
                    </div>
                    <div>
                      <p
                        className={
                          isDarkMode
                            ? "text-white text-2xl"
                            : "text-black text-2xl"
                        }
                      >
                        Tên thí sinh: {getResult.usernameId}
                      </p>
                      <p
                        className={
                          isDarkMode
                            ? "text-white text-2xl"
                            : "text-black text-2xl"
                        }
                      >
                        Mã bài thi: {getResult.examId}
                      </p>
                      <p
                        className={
                          isDarkMode
                            ? "text-white text-2xl"
                            : "text-black text-2xl"
                        }
                      >
                        Tên bài thi: {getResult.examName}
                      </p>
                      <p
                        className={
                          getResult.amount / getResult.result > 2
                            ? "text-red-500 font-bold text-2xl"
                            : "text-green-500 font-bold text-2xl"
                        }
                      >
                        Kết quả: {getResult.result} / {getResult.amount}
                      </p>
                      <p
                        className={
                          isDarkMode
                            ? "text-white text-2xl"
                            : "text-black text-2xl"
                        }
                      >
                        Ngày thi: {transformDate()}
                      </p>
                    </div>
                    <Button
                      className="mt-16"
                      type="primary"
                      onClick={() => {
                        navigate(`/home/classes/${detailClass?.id}`);
                      }}
                    >
                      Xác nhận
                    </Button>
                  </Space>
                </Card>
              </div>
            )}
          </Content>
          <HomeFooter isDarkMode={isDarkMode} Footer={Footer} />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default HomeExam;
