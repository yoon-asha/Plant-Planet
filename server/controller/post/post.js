// post 게시물 작성
module.exports = {
  // 사용자가 작성한 시간 파악하기
  post: (req, res) => {
    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'post ok' });
    }
  },
};
