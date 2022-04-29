const { Post, User } = require('../../models');

module.exports = async (req, res) => {
  const { address } = req.body;

  const postInfo = await Post.find({ address: address });
  const userInfo = await User.find({ address: address });

  const findToken = (userInfo) => {
    return userInfo.token;
  };
  const tokenFilter = userInfo.map(findToken);

  console.log(tokenFilter);
  console.log(postInfo);
  if (postInfo) {
    res.status(200).json({
      success: true,
      data: { tokenFilter, tokenList: postInfo },
      message: 'myPost ok',
    });
  }
  // address 기준 게시글에 기재된 address 의 post 리스팅
  // 로그인이 안됐으면 로그인 하러가기
};
