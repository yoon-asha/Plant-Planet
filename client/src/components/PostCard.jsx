import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import { getAccordionDetailsUtilityClass } from "@mui/material";

// useEffect(() => {
//   async function api() {
//     let response = await axios.get("http://localhost:4000/allpost");
//     let data = await response.data;
//     console.log("data=>>", data);
//     console.log("==>>>", JSON.stringify(data));
//   }
//   api();
// }, []);

//   let response = await axios.get("http://localhost:4000/allpost");
//   console.log("res.data>>", response.data.data);
//   //   let dataa = response.data.data;
//   //   let tokendata = dataa.tokenList;
//   //   const list = tokendata.map((data, idx) => {
//   //     return <div key={idx}>{data}</div>;
//   //   });

//   //   console.log("list>>> ", list);

//   let data = response.data.data;
//   let tokenList = data.tokenList;
//   console.log("tokenlist==>>", tokenList[1].name);
//   return tokenList;
//   //for (let i = 0; i < tokenList.length; i++) {}
//   //   return tokenList;

const PostCard = () => {
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const response = await axios.get("http://localhost:4000/allpost");
    const result = await response.data.data;
    console.log(result);
  }
  console.log(getData);
  //   //   useAsync(postData);
  //   //   const { posts } = useAsync({ postData });
  //   //   console.log("===>", posts);
  //   const { data: data, error, isLoading } = useAsync(postData);
  //   console.log("postData>>>", postData);

  //   //if (isLoading) return <div>로딩중..</div>;
  //   if (error) return <div>에러가 발생했습니다</div>;
  //   if (data) return <div>hi</div>;
  //   console.log("data = ", data);
  return (
    <>
      <div>hi</div>
      <div></div>
    </>
  );
};

export default PostCard;
