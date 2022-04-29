import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import RecommendList from "../components/RecommendList";
import PostList from "../components/PostList";
import { Container, useMediaQuery } from "@mui/material";

export default function Home() {
  const isTablet = useMediaQuery("(max-width: 1200px");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [localStorage.getItem("accessToken")]);

  return (
    <>
      <Nav />
      <Container fixed sx={{ display: "flex" }}>
        <PostList />
        {isLogin ? (
          isTablet ? null : (
            <RecommendList sx={{ position: "fixed" }} />
          )
        ) : null}
      </Container>
    </>
  );
}
