const { Favorite } = require('../../models');
const { Post } = require('../../models');

// like 좋아요 기능
module.exports = {
  post: async (req, res) => {
    const { user_id, post_id } = req.body;
    const liker = await Favorite.findOne({ user_id: user_id, post_id: post_id });

    if (!liker) {
      // console.log(liker);
      const favoriteList = await Favorite.find();

      let id;   // id를 설정.
      if (favoriteList.length === 0) {
        id = 1;
      } else {
        id = favoriteList[favoriteList.length - 1].id + 1;
      }

      await Favorite.create({ id: id, user_id: user_id, post_id: post_id });
      await Post.findOneAndUpdate({ id: post_id }, { $inc: { count: 1 } });
      res.status(200).json({ message: "Like Ok." });

    } else {
      res.status(404).json({ message: "Error" });
    }
  },
};
