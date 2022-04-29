import React from 'react';
import Nav from '../components/Nav';
import { Container, Grid, Box, ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import Async from 'react-async';

const MyPage = () => {
  const myInfo = JSON.parse(localStorage.getItem('userInfo'));
  const accessToken = localStorage.getItem('accessToken');

  async function myPostCard() {
    console.log('====>>>>', accessToken);

    let res = await axios.post(
      'http://localhost:4000/mypost',
      {
        address: myInfo.address,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    let data = res.data.data;
    let tokenList = data.tokenList;
    return tokenList;
  }
  // console.log('mypostcard>>>>', myPostCard());
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
                  background: `url("https://source.unsplash.com/collection/${myInfo.userID}") center center`,
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
            <Async promiseFn={myPostCard}>
              {({ data, error, isPending }) => {
                if (isPending) return 'Loading...';
                if (error) return `Something went wrong: ${error.message}`;

                const MyPostList = data.map((myImg, idx) => {
                  return (
                    <>
                      <ImageListItem key={myImg.id}>
                        <Box
                          sx={{
                            width: 164,
                            height: 164,
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            key={myImg.id}
                            src={myImg.url}
                            style={{ width: '100%', height: '100%' }}
                            // srcSet={`${myImg.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={myImg.desc}
                            loading="lazy"
                          />
                        </Box>
                      </ImageListItem>
                    </>
                  );
                });

                return <>{MyPostList}</>;
              }}
            </Async>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyPage;

{
  /* <ImageList
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
            </ImageList> */
}

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
// ];
