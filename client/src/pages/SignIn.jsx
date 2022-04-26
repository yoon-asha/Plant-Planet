import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Nav from '../components/Nav';

import axios from 'axios';
import { observer } from 'mobx-react';
import useExchange from '../hooks/useExchange';

const theme = createTheme();

// observer
// mobx에서 관리되는 상태가 바뀌었을때
// observer가 선언된 컴포넌트는 바뀐거에 맞춰서 리렌더링된다
export default observer(function SignIn() {
  const exchangeStore = useExchange();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await axios.post('http://localhost:4000/signin', {
        email: formData.get('email'),
        pw: formData.get('password'),
      });

      if (data.success) {
        exchangeStore.setAccessToken(data.data.accessToken);
        exchangeStore.setUserID(data.data.userInfo.id);
        exchangeStore.setEmail(data.data.userInfo.email);
        exchangeStore.setDesc(data.data.userInfo.desc);
        exchangeStore.setAddress(data.data.userInfo.address);
        // console.log(data.data.userInfo);
        alert(data.message);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (exchangeStore.accessToken !== '') {
      navigate('/');
    }
  }, []);

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
});
