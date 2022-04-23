// like 좋아요

// $inc operator를 사용하면 증가 연산이 가능함
// findOne(), deleteOne(), updateOne() 함수를 적절히 사용
// Post(userInfo랑, post, nft(img))를 _id로 DB에서 검색해서
// 좋아요 버튼을 누르면 {$inc: { like: +1 } }
// 좋아요 취소 -> {$inc: { like: -1 } }


// like
// {
//   id: { type: Number, required: true, unique: true },
//   user_id: { type: String, required: true },
//   post_id: { type: String, required: true },
// },

module.exports = {
  post: (req, res) => {
    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'like ok' });
    }
  },
};
