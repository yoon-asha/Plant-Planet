import React from 'react';
import Nav from '../components/Nav';
import { Container, Grid, Box, ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import { Async } from 'react-async';

function myPostCard() {
  let res = axios.get('http://localhost:4000/mypost');
  let data = res.data.data;
  let tokenList = data.tokenList;
  console.log('>>>');
}

const MyPage = () => {
  const myInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <>
      <Nav />
      <Container fixed>
        <Grid container spacing={5}>
          <Grid item sx={{ margin: '0 auto' }} md={8}>
            <Box display={'flex'}>
              <Box
                mt={6}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  background: `url("https://source.unsplash.com/collection${myInfo.id}") center center`,
                  backgroundSize: 'cover',
                }}
              ></Box>
              <Box m={5}>
                <h2>{myInfo.name}</h2>
                <p>{myInfo.desc}</p>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{ margin: '0 auto', borderTop: '1px solid #ccc' }}
            md={8}
            xs={100}
          >
            {/* <ImageList
              cols={3}
              //   rowHeight={164}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList> */}
            {/* <Async promiseFn={myPostCard}>{{ data, error, isPending }}</Async> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyPage;

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
// ];
