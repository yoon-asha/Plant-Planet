
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Async from 'react-async';

import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import Detail from './Detail';

async function getPostCard() {
  let res = await axios.get('http://localhost:4000/allpost');
  let data = res.data.data;
  let tokenList = data.tokenList;
  return tokenList;
}

const PostCard = () => {
  const [accessToken, setAccessToken] = useState('');
  const [userID, setUserID] = useState('');
  const [likeList, setLikeList] = useState([]);
  const [render, setRender] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setAccessToken(accessToken);
      setUserID(userInfo.userID);
    }
  }, []);

  useEffect(() => {
    const getLikeList = async (accessToken, userID) => {
      const { data } = await axios.post(
        'http://localhost:4000/likeInfo',
        {
          user_id: userID,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLikeList(data.data.likeList);
    };

    if (accessToken && userID) {
      getLikeList(accessToken, userID);
    }
  }, [accessToken, userID, render]);

  const clickLike = async (userID, postID) => {
    const { data } = await axios.post(
      'http://localhost:4000/like',
      {
        user_id: userID,
        post_id: postID,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    alert(data.message);
    setRender(postID + '성공');
  };

  const clickUnlike = async (userID, postID) => {
    const { data } = await axios.post(
      'http://localhost:4000/unlike',
      {
        user_id: userID,
        post_id: postID,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    alert(data.message);
    setRender(postID + '취소');
  };

  return (
    <>
      <Async promiseFn={getPostCard}>
        {({ data, error, isPending }) => {
          if (isPending) return 'Loading...';
          if (error) return `Something went wrong: ${error.message}`;
          const postList = data.map((posts, idx) => {
            return (
              <>
                <Box
                  mt={6}
                  sx={{
                    border: '1px solid #ccc',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      m={'0 10px 0 20px'}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        background: `url("https://source.unsplash.com/collection/${posts.userID}") center center`,
                        backgroundSize: 'cover',
                      }}
                    ></Box>
                    <p
                      key={posts.id}
                      style={{
                        fontSize: '1.2rem',
                      }}
                    >
                      {posts.userName}
                    </p>
                  </Box>
                  <img
                    key={idx}
                    src={posts.url}
                    style={{
                      width: '100%',
                      borderTop: '1px solid #ccc',
                      borderBottom: '1px solid #ccc',
                    }}
                    alt={posts.name}
                  />
                  <Box
                    display={'flex'}
                    sx={{
                      alignItems: 'center',
                      borderBottom: '1px solid #ccc',
                    }}
                  >
                    <strong
                      style={{ fontSize: '1.3rem', margin: '0 15px 0 20px' }}
                    >
                      {posts.userName} ☆
                    </strong>
                    <p style={{ fontSize: '1.2rem' }}>{posts.desc}</p>
                  </Box>

                  <BottomNavigation showLabels>
                    {likeList.filter((el) => Number(el) === posts.id).length !==
                    0 ? (
                      <BottomNavigationAction
                        icon={
                          <FavoriteIcon
                            sx={{ color: '#ff0000' }}
                            onClick={() => clickUnlike(userID, posts.id)}
                          />
                        }
                      />
                    ) : (
                      <BottomNavigationAction
                        icon={
                          <FavoriteIcon
                            onClick={() => clickLike(userID, posts.id)}
                          />
                        }
                      />
                    )}

                    <BottomNavigationAction
                      icon={<ModeCommentRoundedIcon />}
                      onClick={Detail}
                    />

                  </BottomNavigation>
                </Box>
              </>
            );
          });

          return <>{postList}</>;
        }}
      </Async>
    </>
  );
};

export default PostCard;
