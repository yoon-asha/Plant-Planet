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
      const token = authorization.split(' ')[1];
      const data = jwt.verify(token, ACCESS_SECRET);

      const { id, email, name } = data;
      const userInfo = await User.findOne({
        id,
        email,
        name,
      });

      console.log(userInfo);

      if (!userInfo) {
        return res
          .status(400)
          .json({ data: null, message: 'access token has been tempered' });
      } else {
        return res.status(200).json({
          data: { userInfo: { id, email, name } },
          message: 'ok',
        });
      }
    }
  },
};
