import React from "react";
import axios from "axios";
import Async from "react-async";

import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import Detail from "./Detail";

async function getPostCard() {
  let res = await axios.get("http://localhost:4000/allpost");
  let data = res.data.data;
  let tokenList = data.tokenList;
  return tokenList;
}

const PostCard = () => {
  return (
    <>
      <Async promiseFn={getPostCard}>
        {({ data, error, isPending }) => {
          if (isPending) return "Loading...";
          if (error) return `Something went wrong: ${error.message}`;
          // if (data) console.log("data = ", data);
          const postList = data.map((posts, idx) => {
            return (
              <>
                <Box
                  mt={6}
                  sx={{
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      m={"0 10px 0 20px"}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        background: `url("https://source.unsplash.com/collection/${posts.userID}") center center`,
                        backgroundSize: "cover",
                      }}
                    ></Box>
                    <p>{posts.userID}</p>
                    <p
                      key={posts.id}
                      style={{
                        fontSize: "1.2rem",
                      }}
                    >
                      {posts.userName}
                    </p>
                  </Box>
                  <img
                    key={idx}
                    src={posts.url}
                    style={{
                      width: "100%",
                      borderTop: "1px solid #ccc",
                      borderBottom: "1px solid #ccc",
                    }}
                    alt={posts.name}
                  />

                  <BottomNavigation showLabels>
                    <BottomNavigationAction icon={<FavoriteIcon />} />
                    <BottomNavigationAction
                      icon={<ModeCommentRoundedIcon />}
                      onClick={Detail}
                    />
                  </BottomNavigation>

                  <Detail />
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
