import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Grid,
  Box,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../logo.svg";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
// import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
// import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

// 모달 박스 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "40vw",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#ccc",
  "&:hover": {
    backgroundColor: "#aaa",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Nav = () => {
  const [open, setOpen] = useState(false);
  const writeOpen = () => setOpen(true);
  const writeClose = () => setOpen(false);

  const [fileUrl, updateFileUrl] = useState(``);
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#fff" }}>
      <Toolbar>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <a href="/">
              <img src={logo} style={{ width: "140px", paddingTop: "6px" }} />
            </a>
          </Grid>
          {/* <Button sx={{ position: "absolute", right: "10px" }}>Login</Button> */}
          {/* <HomeIcon sx={{ color: lightGreen[600] }} /> */}
          <Grid item xs={4}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#333" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
          <Grid item xs={1}>
            <AddBoxOutlinedIcon
              sx={{
                position: "absolute",
                right: "100px",
                fontSize: "37px",
                color: "#333",
              }}
              onClick={writeOpen}
            />
          </Grid>
          <Grid item xs={0}>
            <YardOutlinedIcon
              sx={{
                paddingTop: "1px",
                position: "absolute",
                right: "55px",
                fontSize: "34px",
                color: "#333",
              }}
            />
          </Grid>
        </Grid>

        {/* Write Modal */}
        <Modal
          open={open}
          onClose={writeClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              NFT 발행하기 (게시물 작성)
            </Typography>
            <input type="file" onChange={onChange} />
            {fileUrl && <img src={fileUrl} width="600px" />}
            <TextField
              id="standard-basic"
              label="description here..."
              variant="standard"
              color="success"
            ></TextField>
            <Button color="success" onClick={writeClose}>
              발행하기
            </Button>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
