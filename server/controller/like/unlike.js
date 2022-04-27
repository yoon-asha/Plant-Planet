const { Favorite } = require('../../models');
const { Post } = require('../../models');

// unlike 좋아요 취소 기능
module.exports = {
  post: async (req, res) => {

    const { user_id, post_id } = req.body;
    const liker = await Favorite.findOne({ user_id: user_id, post_id: post_id }); // 게시물 Info뽑아서 count + 1.

    if (liker) {    // 좋아요 누른 유저가 이미 있다면 -> 좋아요 취소를 실행
      await Favorite.findOneAndDelete({ user_id, post_id }); //
      await Post.findOneAndUpdate({ id: post_id }, { $inc: { count: - 1 } }); // Post count + 1 해주기
      res.status(200).json({ message: "UnLike Ok." });
    } else {
      res.status(404).json({ message: "Error" });
    }
  },
};
