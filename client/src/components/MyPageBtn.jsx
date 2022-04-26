import React, { useState } from 'react';
import { Menu, MenuItem, Fade } from '@mui/material';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import { Link } from 'react-router-dom';
import useExchange from '../hooks/useExchange';
import { observer } from 'mobx-react';

export default observer(function FadeMenu() {
  const exchangeStore = useExchange();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    exchangeStore.setAccessToken('');
    exchangeStore.setUserID(0);
    exchangeStore.setEmail('');
    exchangeStore.setDesc('');
    exchangeStore.setAddress('');
  };

  return (
    <>
      <div>
        <YardOutlinedIcon
          id='fade-button'
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            paddingTop: '1px',
            position: 'absolute',
            right: '55px',
            fontSize: '34px',
            color: '#333',
          }}
        />
        <Menu
          id='fade-menu'
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {/* <MenuItem onClick={handleClose} component="a" href="/mypage">
            Profile
          </MenuItem> */}
          {exchangeStore.accessToken === '' ? (
            <>
              <Link
                to='/signin'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem onClick={handleClose}>Sign In</MenuItem>
              </Link>
              <Link
                to='/signup'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to='/mypage'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link to='#' style={{ textDecoration: 'none', color: '#000' }}>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Link>
            </>
          )}
        </Menu>
      </div>
    </>
  );
});
