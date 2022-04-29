import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import GlobalProvider from "./store/index";

function App() {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/mypage" element={<MyPage />} />
        </Routes>
      </GlobalProvider>
    </>
  );
}

export default App;
