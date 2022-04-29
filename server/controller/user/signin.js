const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access';

// signin
module.exports = async (req, res) => {
  const { email, pw } = req.body;

  await User.findOne({ email, pw }).then((userInfo) => {
    if (!userInfo) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'ID 혹은 PW 가 틀렸습니다.',
      });
    } else {
      const { email, name } = userInfo;
      const payload = { email, name };
      const accessToken = jwt.sign(payload, ACCESS_SECRET);

      return res.status(200).json({
        success: true,
        data: {
          accessToken,
          userInfo: {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            desc: userInfo.desc,
            address: userInfo.address,
          },
        },
        message: '로그인이 완료되었습니다',
      });
    }
  });
};
