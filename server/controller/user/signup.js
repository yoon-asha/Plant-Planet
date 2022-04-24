const { User } = require('../../models');

// signup
module.exports = {
  post: (req, res) => {
    // signup 경우
    // req.body(address, name, desc)가 전달
    // monogoDB에 userSchema에 address 존재 여부를 확인 - findOne?
    // 있으면
    // response로 이미 회원가입된 사람이다 message 보내기, 상태코드 조금다를걸로 결정하기
    // 없으면
    // userSchema에 넣을 값들 정하기 -
    // const user = new userSchema({
    //   id: 2,
    //   address: '0x123456789',
    //   name: 'kyeom',
    //   desc: 'kyeom desc',
    // });
    // id는 비교후 +1 증가 시키기
    // DB에 저장하기 - save?
    // response 보내기 회원가입 완료했습니다, 상태코드는 200

    const user = new User({
      id: 2,
      email: "wkdtjdwls@wkdtjdwls.com",
      pw: "sungjin",
      address: '0x123456789',
      name: 'kyeom',
      desc: 'kyeom desc',
    });

    user.save().then(() => console.log('Saved successfully'));

    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'signup ok' });
      // return res.status(200).json({ message: 'ok' });
    }
  },
};
