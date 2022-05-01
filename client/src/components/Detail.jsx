import React, { useState } from 'react';
import {
  Modal,
  Box,
  BottomNavigationAction,
  Grid,
  Button,
  TextField,
} from '@mui/material';
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
        onClose={detailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          md={8}
          sx={{
            bgcolor: '#fff',
            p: 3,
            justifyContent: 'center',
          }}
        >
          <Grid item sx={{ fontSize: '1.6rem', mb: 4 }}>
            NFT owner <span style={{ color: 'gold' }}> ☆ </span>
            {props.userName}
          </Grid>
          <Grid container spacing={5}>
            <Grid item md={8}>
              <img src={props.url} width={'100%'} />
            </Grid>
            <Grid item md={4} width="100%">
              NFT name <span style={{ color: 'gold' }}> ☆ </span> {props.name}
              <Box mt={2} borderTop="1px solid #ccc" pt={2} mb={3}>
                NFT 소개글 <br /> <br />
                {props.desc}
              </Box>
              <Grid item md={12} width="100%">
                <TextField
                  variant="outlined"
                  placeholder="댓글 달기"
                  size="small"
                  sx={{ width: '75%' }}
                ></TextField>
                <Button
                  color="success"
                  variant="outlined"
                  sx={{ height: '40px', width: '20%' }}
                >
                  게시
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default Detail;
