import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";

export default function RecomList() {
  const myInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Container fixed sx={{ bgcolor: "#f1faee", width: "65%" }}>
      <Grid item sx={{ borderBottom: "1px solid #aaa" }}>
        <Box display={"flex"} p={3}>
          <Box
            mt={3}
            sx={{
              width: 100,
              height: 100,
              borderRadius: 100,
              background:
                'url("https://source.unsplash.com/collection/1") center center',
              backgroundSize: "cover",
            }}
          ></Box>
          <Box m={2}>
            <h2>{myInfo.name}</h2>
            <p>{myInfo.desc}</p>
          </Box>
        </Box>
      </Grid>
      <Grid item mt={4}>
        <Typography
          component="p"
          variant="p"
          pl={2}
          sx={{ fontFamily: "Jua", color: "#aaa" }}
        >
          회원님을 위한 추천
        </Typography>
        <Box display={"flex"} pt={2} pl={2}>
          <Box
            mt={2}
            sx={{
              width: 65,
              height: 65,
              borderRadius: 100,
              background:
                'url("https://source.unsplash.com/collection/2") center center',
              backgroundSize: "cover",
            }}
          ></Box>
          <Box m={1} sx={{ fontSize: "0.75rem" }}>
            <h2>닉네임</h2>
            <p>설명글</p>
          </Box>
        </Box>
        <Box display={"flex"} pl={2}>
          <Box
            mt={2}
            sx={{
              width: 65,
              height: 65,
              borderRadius: 100,
              background:
                'url("https://source.unsplash.com/collection/3") center center',
              backgroundSize: "cover",
            }}
          ></Box>
          <Box m={1} sx={{ fontSize: "0.75rem" }}>
            <h2>닉네임</h2>
            <p>설명글</p>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
