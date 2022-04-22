import React, { useState } from "react";
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";

import styles from "./PostList.module.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";

const PostList = () => {
  return (
    <Container fixed sx={{ bgcolor: "#ccc" }}>
      <Box
        sx={{
          width: "50vw",
          height: "400px",
        }}
      >
        <p className={styles.name}>닉네임</p>
        <BottomNavigation showLabels>
          <BottomNavigationAction icon={<FavoriteIcon />} />
          <BottomNavigationAction icon={<ModeCommentRoundedIcon />} />
        </BottomNavigation>
      </Box>
    </Container>
  );
};
export default PostList;
