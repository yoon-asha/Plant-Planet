import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Box, Typography } from '@mui/material';

export default function RecomList() {
  const [recommand, setRecommand] = useState('');
  const myInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const getRecomList = async () => {
      const { data } = await axios.post(
        'http://localhost:4000/recomList',
        {
          address: myInfo.address,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setRecommand(data.data.recomList);
    };
    getRecomList();
  }, []);

  console.log(recommand);

  return (
    <>
      <Container sx={{ width: '700px' }}>
        <Box sx={{ position: 'fixed', width: '390px' }}>
          <Grid item sx={{ borderBottom: '1px solid #aaa' }}>
            <Box display={'flex'} p={3}>
              <Box
                mt={3}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  background: `url("https://source.unsplash.com/collection/${myInfo.id}") center center`,
                  backgroundSize: 'cover',
                }}
              ></Box>
              <Box m={2}>
                <h2>{myInfo.name}</h2>
                <p>{myInfo.desc}</p>
              </Box>
            </Box>
          </Grid>
          <Grid item mt={4}>
            <Typography
              component='p'
              variant='p'
              pl={2}
              sx={{ fontFamily: 'Jua', color: '#aaa' }}
            >
              회원님을 위한 추천
            </Typography>
            {!!recommand && (
              <>
                {recommand.map((el) => (
                  <Box display={'flex'} pt={2} pl={2}>
                    <Box
                      mt={2}
                      sx={{
                        width: 65,
                        height: 65,
                        borderRadius: 100,
                        background: `url("https://source.unsplash.com/collection/${el.id}") center center`,
                        backgroundSize: 'cover',
                      }}
                    ></Box>
                    <Box m={1} sx={{ fontSize: '0.75rem' }}>
                      <h2>{el.name}</h2>
                      <p>{el.desc}</p>
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
