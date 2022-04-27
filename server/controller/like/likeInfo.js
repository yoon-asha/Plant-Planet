const { Favorite } = require('../../models');

// 해당 유저가 어떤 게시물에 좋아요를 눌렀는지에 대한 정보.
module.exports = {
  get: async (req, res) => {
    const { user_id } = req.body;
    const findPost = await Favorite.find({ user_id: user_id }); // 유저가 좋아요 누른 게시물들의 리스트를 찾는다.

    const result = findPost.map(el => el.post_id);  // findPost에서 post_id 만을 추출.
    console.log(result);

    // map 돌린 post_id 값을 데이터로 보내준다.
    res.status(200).json({ success: true, data: result, message: 'Ok' });
  },
};