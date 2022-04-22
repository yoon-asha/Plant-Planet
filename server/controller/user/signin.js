const mongoose = require('mongoose');
const User = require('../../models/user');

// signin
module.exports = {
  post: async (req, res) => {
    const userInfo = await User.find({
      where: { name: req.body.name }
    }).then((userInfo) => {
      if (!userInfo) {
        return res.json({ message: "없다 그런친구~" })
      } else {
        return res.json({ data: req.body.name, message: "맞는애가없다" })

      }
    })
    console.log(await User.find({ where: { name: req.body.name } }))


    // req.body부분 address
    // DB address를 찾고 - findone?
    // 있으면
    // session에 값들을 저장(address) token 하셔도됩니다 (편하신거)
    // message 로그인 성공, 상태코드는 200
    // 없으면
    // message 로그인 실패, 상태코드는 400
    // 페이지 넘기기?
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
