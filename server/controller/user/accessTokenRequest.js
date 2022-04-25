const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access';

module.exports = {
  get: async (req, res) => {
    const { headers: { authorization } = {} } = req;

    if (!authorization) {
      return res
        .status(400)
        .json({ data: null, message: 'invalid access token' });
    } else {
      // jwt 토큰(access token) 검증
      const token = authorization.split(' ')[1];
      const data = jwt.verify(token, ACCESS_SECRET);
      const { email, name } = data;

      // DB에서 userInfo 찾기
      const userInfo = await User.findOne({ email, name });

      if (!userInfo) {
        return res
          .status(400)
          .json({ data: null, message: 'access token has been tempered' });
      } else {
        return res.status(200).json({
          data: {
            userInfo: {
              email: userInfo.email,
              name: userInfo.name,
              desc: userInfo.desc,
              address: userInfo.address,
            },
          },
          message: 'ok',
        });
      }
    }
  },
};
