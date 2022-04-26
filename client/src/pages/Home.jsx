import React from "react";
import Nav from "../components/Nav";
import RecommendMember from "../components/RecommendMember";
import PostList from "../components/PostList";
import { Container, useMediaQuery } from "@mui/material";

export default function Home() {
  const isTablet = useMediaQuery("(max-width: 1200px");
  return (
    <>
      <Nav />
      <Container fixed sx={{ display: "flex" }}>
        <PostList />
        {isTablet ? null : <RecommendMember sx={{ position: "fixed" }} />}
      </Container>
    </>
  );
}
