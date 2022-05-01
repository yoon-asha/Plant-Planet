import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Nav from '../components/Nav';

import axios from 'axios';

const theme = createTheme();

// observer
// mobx에서 관리되는 상태가 바뀌었을때
// observer가 선언된 컴포넌트는 바뀐거에 맞춰서 리렌더링된다
export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          email: formData.get('email'),
          pw: formData.get('password'),
        }
      );

      if (data.success) {
        window.localStorage.setItem('accessToken', data.data.accessToken);
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify({
            userID: data.data.userInfo.id,
            email: data.data.userInfo.email,
            name: data.data.userInfo.name,
            desc: data.data.userInfo.desc,
            token: data.data.userInfo.token,
            address: data.data.userInfo.address,
          })
        );
        alert(data.message);
        navigate('/');
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ fontFamily: 'Jua' }}>
            로그인
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='이메일'
              name='email'
              autoComplete='email'
              autoFocus
              color='success'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='비밀번호'
              type='password'
              id='password'
              autoComplete='current-password'
              color='success'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='success' />}
              label='아이디 저장하기'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, fontFamily: 'Jua', fontSize: '1.2rem' }}
              color='success'
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to='#'
                  style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  비밀번호를 잊었나요?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to='/signup'
                  style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  {'가입된 계정이 없다면 요기로 오세요'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
