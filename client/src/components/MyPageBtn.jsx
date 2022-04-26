import React, { useState } from "react";
import { Menu, MenuItem, Fade } from "@mui/material";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import { Link } from "react-router-dom";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          {/* <MenuItem onClick={handleClose} component="a" href="/mypage">
            Profile
          </MenuItem> */}
          <Link to="/mypage" style={{ textDecoration: "none", color: "#000" }}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          <Link to="/signin" style={{ textDecoration: "none", color: "#000" }}>
            <MenuItem onClick={handleClose}>Sign In</MenuItem>
          </Link>
        </Menu>
      </div>
    </>
  );
}
