const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh';
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access';

module.exports = {
  get: async (req, res) => {
    const { cookies: { refreshToken } = {} } = req;

    if (!refreshToken) {
      return res
        .status(400)
        .json({ data: null, message: 'refresh token not provided' });
    } else {
      try {
        const { email, name } = jwt.verify(refreshToken, REFRESH_SECRET);

        const userInfo = await User.findOne({ email, name });

        if (!userInfo) {
          return res
            .status(401)
            .json({ data: null, message: 'refresh token has been tempered' });
        } else {
          const { email, name } = userInfo;
          const payload = { email, name };

          const accessToken = jwt.sign(payload, ACCESS_SECRET, {
            expiresIn: '30m',
          });

          res.status(200).json({
            data: {
              accessToken: accessToken,
              userInfo: { email, name },
            },
            message: 'ok',
          });
        }
      } catch {
        return res.status(401).json({
          data: null,
          message: 'invalid refresh token, please log in again',
        });
      }
    }
  },
};
