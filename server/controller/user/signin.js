// signin
module.exports = {
  post: (req, res) => {
    // req.body부분 address
    // DB address를 찾고 - findone?
    // 있으면
    // session에 값들을 저장(address) token 하셔도됩니다 (편하신거)
    // message 로그인 성공, 상태코드는 200
    // 없으면
    // message 로그인 실패, 상태코드는 400
    // 페이지 넘기기?

    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'signin ok' });
      // return res.status(200).json({ message: 'ok' });
    }
  },
};
