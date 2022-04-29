const { Post } = require('../../models');

module.exports = async (req, res) => {
  const userInfo = await Post.find({});

  if (userInfo) {
    res.status(200).json({
      success: true,
      data: { tokenList: userInfo },
      message: 'allPost ok',
    });
  }
  // address 기준 게시글에 기재된 address 의 post 리스팅
  // 로그인이 안됐으면 로그인 하러가기
};
