// likeInfo 좋아요 갯수 가져오기
module.exports = {
  get: (req, res) => {
    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'likeInfo ok' });
    }
  },
};
