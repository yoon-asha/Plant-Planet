import React, { useState } from "react";
import { Modal, Box, BottomNavigationAction } from "@mui/material";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";

const Detail = () => {
  const [open, setOpen] = useState(false);

  const detailOpen = () => setOpen(true);
  const detailClose = () => setOpen(false);
  return (
    <>
      <BottomNavigationAction
        icon={<ModeCommentRoundedIcon />}
        onClick={detailOpen}
      />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
          }}
        >
          hello hi
        </Box>
      </Modal>
      <Box>hello world</Box>
    </>
  );
};

export default Detail;
