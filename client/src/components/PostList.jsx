import React, { useEffect } from "react";
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";

import styles from "./PostList.module.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";

import axios from "axios";
import PostCard from "./PostCard";

const PostList = () => {
  // useEffect(() => {
  //   async function api() {
  //     let response = await axios.get("http://localhost:4000/allpost");
  //     let data = await response.data;
  //     console.log("data=>>", data);
  //     console.log("==>>>", JSON.stringify(data));
  //   }
  //   api();
  // }, []);

  // let name = "";
  // const PostData = async () => {
  //   let response = await axios.get("http://localhost:4000/allpost");
  //   let data = await response.data;
  //   console.log("data==>>", data);
  //   console.log("list==>>", data.data.tokenList);
  //   let tokenList = data.data.tokenList;
  //   // console.log("tokenlist==>>", tokenList[1].name);

  //   for (let i of tokenList) {
  //     console.log(i.name);
  //     name = i.name;
  //   }
  // };

  // PostData();
  // console.log("==>>", name);
  PostCard();
  return (
    <Container fixed sx={{ bgcolor: "#ccc" }}>
      <Box
        sx={{
          width: "100%",
          height: "400px",
        }}
      >
        <p className={styles.name}>닉네임</p>
        <PostCard />
        <BottomNavigation showLabels>
          <BottomNavigationAction icon={<FavoriteIcon />} />
          <BottomNavigationAction icon={<ModeCommentRoundedIcon />} />
        </BottomNavigation>
      </Box>
    </Container>
  );
};
export default PostList;
