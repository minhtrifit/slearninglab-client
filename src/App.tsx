import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

import HomeExam from "./pages/HomeExam";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/home/*" element={<HomePage />} />
      <Route path="/exam/:id" element={<HomeExam />} />
    </Routes>
  );
};

export default App;
