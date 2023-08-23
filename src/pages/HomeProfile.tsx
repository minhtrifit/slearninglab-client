import { useEffect } from "react";
import { Card, Space, Avatar, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import UserChart from "../components/UserChart";

import { getUserProfile } from "../redux/reducers/user.reducer";

const { Search } = Input;

const HomeProfile = () => {
  const dispatchAsync = useAppDispatch();

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const findUser = useSelector<RootState, any | null>(
    (state) => state.user.findUser
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (username) dispatchAsync(getUserProfile(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="min-h-[800px] flex flex-col items-start">
      <Search
        className="w-[250px]"
        placeholder="Tìm kiếm hồ sơ người dùng"
        allowClear
        onSearch={async (e: string) => {
          if (e === "") dispatchAsync(getUserProfile(username));
          else {
            const rs = await dispatchAsync(getUserProfile(e));
            if (rs.type === "exam/get_user_profile/fulfilled") {
              toast.success("Tra cứu thành công");
            } else {
              toast.error("Không tìm thấy hồ sơ");
            }
          }
        }}
        onPressEnter={async (e: any) => {
          if (e.target.value === "") dispatchAsync(getUserProfile(username));
          else {
            const rs = await dispatchAsync(getUserProfile(e.target.value));
            if (rs.type === "exam/get_user_profile/fulfilled") {
              toast.success("Tra cứu thành công");
            } else {
              toast.error("Không tìm thấy hồ sơ");
            }
          }
        }}
      />
      <div className="w-[100%] flex justify-center">
        <Card title="Hồ sơ người dùng" className="mt-10 w-[300px] lg:w-[800px]">
          <div className="flex flex-col lg:flex-row gap-10">
            <Avatar size={64} icon={<UserOutlined />} />
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-4 text-xl">
                <p className="font-bold">Tên người dùng: </p>
                <p>{findUser?.name}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-xl">
                <p className="font-bold">ID: </p>
                <p>{findUser?.id}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-xl">
                <p className="font-bold">Email: </p>
                <p>{findUser?.email}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-xl">
                <p className="font-bold">Vai trò: </p>
                <div>
                  {findUser?.roles?.map((role: string) => {
                    const uid = v4();
                    return (
                      <p key={uid}>
                        {role === "teacher" && "Giáo viên"}
                        {role === "student" && "Học sinh"}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <UserChart
            countAttendance={findUser?.countAttendance}
            countResult={findUser?.countResult}
            countCalender={findUser?.countCalender}
            countTask={findUser?.countTask}
          />
        </Card>
      </div>
    </div>
  );
};

export default HomeProfile;
