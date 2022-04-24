const mongoose = require('mongoose');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh';

// signin
module.exports = {
  post: async (req, res) => {
    const { email, pw } = req.body;

    const userInfo = await User.findOne({ email, pw }).then((userInfo) => {
      if (!userInfo) {
        return res
          .status(400)
          .json({ data: null, message: 'ID 혹은 PW 가 틀렸습니다.' });
      } else {
        const { id, email, name } = userInfo;

        const payload = { id, email, name };
        console.log(payload);

        const accessToken = jwt.sign(payload, ACCESS_SECRET, {
          expiresIn: '30m',
        });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
          expiresIn: '1h',
        });

        console.log(refreshToken);

        return res
          .cookie('refreshToken', refreshToken)
          .status(200)
          .json({ data: { accessToken: accessToken }, message: 'OK' });

        // req.session.save(() => {
        //   // if (req.seesion.emai
        //   // req.session.email = userInfo.email;
        //   // if (req.session.email) {
        //   //   req.session.email = [userInfo.email];
        //   // } else {
        //   //   // req.session.email = [...req.session.email, userInfo.email];
        //   //   console.log(req.session.email);
        //   // }
        //   // req.session.email = '1';

        //   res.send({ message: 'OK' });
        //   console.log(req.session);
        // });
        // req.session.signinData = { ...userInfo }
        // req.session.save(err => { if (err) console.log(err) })
        // res.status(200).json({ data: req.session.signinData, message: 'success' })
        // console.log(req.session)
      }

      // else {
      //   return res.json({ data: req.body.name, message: "여기있었네" })
      // }
    });

    // console.log(userInfo)

    // req.body부분 address
    // DB address를 찾고 - findone?
    // 있으면
    // session에 값들을 저장(address) token 하셔도됩니다 (편하신거)
    // message 로그인 성공, 상태코드는 200
    // 없으면
    // message 로그인 실패, 상태코드는 400
    // 페이지 넘기기?

    // pem 파일 서버에 전송 (mkcert)

    // if(req.body.email === undefined && 디비 이메일)
    // console.log(await User.find({}), (err, data) => {

    //   console.log(data[1])
    // })

    // console.log(await User.find({
    // $where: { "name": req.body.name }
    // }))
    // console.log(req.body)
    // let userName = await User.collection.findOne()
    // if (userName !== 'jin') {
    //   let myName = userName.name;
    //   console.log(res.send({ message: "no!" }))
    //   console.log(myName);
    // }

    // const userEmail = req.body.email;
    // const userAdrs = req.body.address;

    //   if (false) {
    //     return res.status(400).json({ message: 'not authorized' });
    //   } else {
    //     return res.status(200).json({ message: 'signin ok' })

    //     // return res.status(200).json({ message: 'ok' });
    //   }
  },
};
