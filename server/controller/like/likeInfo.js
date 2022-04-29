const { Favorite } = require('../../models');

// 해당 유저가 어떤 게시물에 좋아요를 눌렀는지에 대한 정보.
module.exports = async (req, res) => {
  try {
    const { user_id } = req.body;
    const findPost = await Favorite.find({ user_id: user_id }); // 유저가 좋아요 누른 게시물들의 리스트를 찾는다.

    const result = findPost.map((el) => el.post_id); // findPost에서 post_id 만을 추출.

    // map 돌린 post_id 값을 데이터로 보내준다.
    res.status(200).json({
      success: true,
      data: { likeList: result },
      message: '좋아요 리스트를 성공적으로 가져왔습니다.',
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      data: null,
      message: '좋아요를 가져오는데 실패했습니다.',
    });
  }
};
