const { Post } = require('../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
  const { address } = req.body;

  const userInfo = await Post.find({ address: address })

  if (userInfo) {
    console.log(userInfo)
    res.status(200).json({
      success: true,
      data: { tokenList: userInfo },
      message: 'myPost ok'
    });
  }



  // address 기준 게시글에 기재된 address 의 post 리스팅
  // 로그인이 안됐으면 로그인 하러가기
};
