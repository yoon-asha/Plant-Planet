import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Fade } from "@mui/material";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import { Link } from "react-router-dom";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
  };

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
      <div>
        <YardOutlinedIcon
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            paddingTop: "1px",
            position: "absolute",
            right: "55px",
            fontSize: "34px",
            color: "#333",
          }}
        />
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {isLogin ? (
            <>
              <Link
                to="/mypage"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleClose}>Sign In</MenuItem>
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
              </Link>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}
