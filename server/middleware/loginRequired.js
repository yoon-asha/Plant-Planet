const User = require('../models/user');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access';

module.exports = async (req, res, next) => {
  const { headers: { authorization } = {} } = req;

  try {
    if (!authorization) {
      // *토큰이 존재하지 않을때*
      return res.status(500).json({
        success: false,
        data: null,
        message: '토큰이 존재 하지 않습니다',
      });
    } else {
      // *제대로 된 토큰일때*
      // jwt 토큰(access token) 검증
      const token = authorization.split(' ')[1];
      const data = jwt.verify(token, ACCESS_SECRET);
      const { email, name } = data;

      // DB에서 userInfo 찾기
      const userInfo = await User.findOne({ email, name });

      if (!userInfo) {
        // *유효하지 않은 토큰일때*
        return res.status(500).json({
          success: false,
          data: null,
          message: '유효하지 않은 토큰입니다',
        });
      } else {
        // *유효한 토큰일때*
        next();
      }
    }
  } catch (e) {
    // *만료된 토큰일때*
    return res.status(500).json({
      success: false,
      data: null,
      message: '만료된 토큰입니다',
    });
  }
};
