import React from "react";
import Nav from "../components/Nav";
import RecommendMember from "../components/RecommendMember";
import PostList from "../components/PostList";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Nav />
      <Container fixed sx={{ display: "flex" }}>
        <PostList />
        {visualViewport === "700px" ? (
          <RecommendMember />
        ) : (
          <RecommendMember sx={{ display: "none" }} />
        )}
      </Container>
    </>
  );
}
