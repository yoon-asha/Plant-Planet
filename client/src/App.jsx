import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route expact path="/signin" element={<SignIn />} />
        <Route expact path="/signup" element={<SignUp />} />
        <Route expact path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
