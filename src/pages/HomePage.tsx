import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { useTitle } from "../hooks/useTitle";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const dispathAsync = useAppDispatch();

  useTitle("Slearninglab | Trang chủ");

  const isLogin = useSelector<RootState, boolean | undefined>(
    (state) => state.user.isLogin
  );

  return <>{isLogin ? <div>HomePage</div> : <Navigate to="/" />}</>;
};

export default HomePage;
