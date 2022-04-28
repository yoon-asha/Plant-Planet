import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import logo from "../logo.svg";
import MyPageBtn from "./MyPageBtn";
// import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
// import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Search from "./Search";
import { create } from "ipfs-http-client";
import axios from "axios";
const client = create("https://ipfs.infura.io:5001/api/v0");

// 모달 박스 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "450px",
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Nav = () => {
  const [open, setOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

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

  const createNFT = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/post",
        {
          url: fileUrl,
          address: address,
          name: name,
          desc: desc,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(data);
      alert(data.message);
      setAddress("");
      setName("");
      setDesc("");
      updateFileUrl("");
    } catch (e) {
      console.log(e);
    }

    writeClose();
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLogin(false);
    } else {
      const userInfo = localStorage.getItem("userInfo");
      setIsLogin(true);
      setAccessToken(accessToken);
      setAddress(JSON.parse(userInfo).address);
    }
  }, [localStorage.getItem("accessToken")]);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#fff" }}>
        <Toolbar>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Link to="/">
                <img src={logo} style={{ width: "140px", paddingTop: "6px" }} />
              </Link>
            </Grid>
            {/* <Button sx={{ position: "absolute", right: "10px" }}>Login</Button> */}
            {/* <HomeIcon sx={{ color: lightGreen[600] }} /> */}
            <Grid item xs={4}>
              <Search />
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

            {/* login, mypage button */}
            <Grid item>
              <MyPageBtn />
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
              {isLogin ? (
                <>
                  <Grid item>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ marginBottom: 2 }}
                    >
                      Create NFT
                    </Typography>
                    <Typography
                      id="modal-modal-subtitle"
                      variant="subtitle1"
                      component="h2"
                    >
                      {address}
                    </Typography>
                  </Grid>
                  {fileUrl && <img src={fileUrl} width="100%" />}
                  <Grid item>
                    <TextField
                      id="standard-basic"
                      label="name here..."
                      variant="standard"
                      color="success"
                      onChange={(e) => changeName(e)}
                    ></TextField>
                    <TextField
                      id="standard-basic"
                      label="description here..."
                      variant="standard"
                      color="success"
                      onChange={(e) => changeDesc(e)}
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      onChange={onChange}
                    />
                    <label htmlFor="icon-button-file">
                      <Button variant="icon" color="primary" component="span">
                        Select
                      </Button>
                    </label>
                    {fileUrl && name && desc && (
                      <Button color="primary" onClick={createNFT}>
                        Create
                      </Button>
                    )}
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ marginBottom: 2 }}
                  >
                    로그인이 먼저 진행해주세요
                  </Typography>
                </Grid>
              )}
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
