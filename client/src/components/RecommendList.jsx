import React from "react";
import { Container, Grid, Box } from "@mui/material";

export default function RecomList() {
  return (
    <Container fixed sx={{ bgcolor: "#eee", width: "65%" }}>
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
            <h2>내 닉네임</h2>
            <p>설명글</p>
          </Box>
        </Box>
      </Grid>
      <Grid item mt={4}>
        <Box display={"flex"} pt={3} pl={3}>
          <Box
            mt={3}
            sx={{
              width: 70,
              height: 70,
              borderRadius: 100,
              background:
                'url("https://source.unsplash.com/collection/2") center center',
              backgroundSize: "cover",
            }}
          ></Box>
          <Box m={2} sx={{ fontSize: "0.8rem" }}>
            <h2>닉네임</h2>
            <p>설명글</p>
          </Box>
        </Box>
        <Box display={"flex"} pl={3}>
          <Box
            mt={3}
            sx={{
              width: 70,
              height: 70,
              borderRadius: 100,
              background:
                'url("https://source.unsplash.com/collection/3") center center',
              backgroundSize: "cover",
            }}
          ></Box>
          <Box m={2} sx={{ fontSize: "0.8rem" }}>
            <h2>닉네임</h2>
            <p>설명글</p>
          </Box>
        </Box>
        <Box display={"flex"} pl={3}>
          <Box
            mt={3}
            sx={{
              width: 70,
              height: 70,
              borderRadius: 100,
              background:
                'url("https://source.unsplash.com/collection/4") center center',
              backgroundSize: "cover",
            }}
          ></Box>
          <Box m={2} sx={{ fontSize: "0.8rem" }}>
            <h2>닉네임</h2>
            <p>설명글</p>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
