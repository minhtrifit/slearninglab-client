import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Avatar, Space, Form, Button, Input, Empty } from "antd";

import { v4 } from "uuid";

import { Socket } from "socket.io-client";
import { Message } from "../types/chat.type";
import { ClassroomType } from "../types/class.type";

import { getAllChatByRoom, sendMessage } from "../helpers/socket";

const ClassChat = () => {
  const [form] = Form.useForm();
  const [isSend, setIsSend] = useState<boolean>();
  const mainRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const socket = useSelector<RootState, Socket | undefined>(
    (state) => state.socket.socket
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const detailClass = useSelector<RootState, ClassroomType | null>(
    (state) => state.class.detailClass
  );

  const messageList = useSelector<RootState, Message[] | undefined>(
    (state) => state.class.messageList
  );

  useEffect(() => {
    // console.log("Update chat");
    getAllChatByRoom(socket, detailClass?.id, dispatch);
    setIsSend(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSend]);

  // components/MessageList.tsx
  useEffect(() => {
    if (messageList !== undefined) {
      if (messageList.length) {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        mainRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList?.length]);

  const onFinish = (values: any) => {
    const text = values.messageText;

    if (detailClass?.id !== undefined)
      sendMessage(socket, username, text, detailClass?.id, dispatch);
    setIsSend(true);

    setTimeout(() => {
      form.setFieldsValue({ messageText: "" });
    }, 0);
  };

  return (
    <div className="flex flex-col items-center" ref={ref}>
      <Space
        size="large"
        className="border-[1px] border-gray-300 border-solid rounded-md p-5 min-h-[500px] max-h-[500px] overflow-y-auto flex flex-col items-stretch w-[80%] mx-auto my-20"
      >
        {Array.isArray(messageList) && messageList?.length !== 0 ? (
          messageList?.map((mess) => {
            const uid = v4();
            return (
              <Space
                key={uid}
                className={`${
                  mess.name === username ? "flex justify-end" : "flex"
                }`}
              >
                <Avatar>{mess.name?.charAt(0).toUpperCase()}</Avatar>
                <Space className="px-5 py-2 bg-blue-700 rounded-lg text-white">
                  <div>{mess.name}:</div>
                  <div>{mess.text}</div>
                </Space>
                <div ref={mainRef} />
              </Space>
            );
          })
        ) : (
          <Empty className="my-20" description="Bắt đầu đoạn chat" />
        )}
      </Space>
      <div className="w-[80%] flex flex-col items-end">
        <Form
          form={form}
          id="messageform"
          className="w-[100%]"
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            name="messageText"
            rules={[
              { required: true, message: "Nhập tin nhắn trước khi gửi!" },
            ]}
          >
            <Input
              allowClear={true}
              autoComplete="off"
              className="h-[50px]"
              type="text"
              placeholder="Nhập tin nhắn để trò chuyện"
            />
          </Form.Item>
        </Form>
        <Button type="primary" form="messageform" htmlType="submit">
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ClassChat;
