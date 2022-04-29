import React, { useState } from 'react';
import { Modal, Box, BottomNavigationAction } from '@mui/material';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';

const Detail = (props) => {
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
          }}
        >
          <Box>
            <img src={props.url} style={{ width: '300px' }} />
          </Box>
          <Box>{props.name}</Box>
          <Box>{props.desc}</Box>
        </Box>
      </Modal>
    </>
  );
};

export default Detail;
