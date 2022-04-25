const Web3 = require('web3');
const { User } = require('../../models');

// signup
module.exports = async (req, res) => {
  // const user = new User({
  //   id: 10,
  //   email: '1234@gmail.com',
  //   pw: '1234',
  //   address: '0x123456789',
  //   name: 'test',
  //   desc: 'test desc',
  // });

  // user.save().then(() => console.log('Saved successfully'));

  const { email, pw, name, desc } = req.body;
  // console.log(email);
  if (!email || !pw || !name || !desc) {
    return res.status(422).json({ message: '회원정보를 모두 입력해주세요.' });
  } else {
    const userEmail = await User.findOne({ email: email }); // 이메일이 DB에 존재하는지 검증
    const userName = await User.findOne({ name: name }); // 유저의 닉네임 중복 여부 검증
    // console.log(user);
    if (userEmail) {
      // 만약 이메일이 DB에 존재한다면 -> 중복 에러처리
      return res.status(409).json({ message: '사용중인 이메일이 있습니다.' });
    } else if (userName) {
      return res.status(409).json({ message: '사용중인 닉네임이 있습니다.' });
    } else {
      // 모든 조건이 충족되면 지갑을 생성하고, DB에 create.

      // ropsten 연결
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          'https://ropsten.infura.io/v3/265426e092ef406fa3d0aa62f8a1dca8'
        )
      );

      const { address, privateKey } = web3.eth.accounts.create();

      // id 설정 로직
      const userList = await User.find();
      let id;

      if (userList.length === 0) {
        id = 1;
      } else {
        id = userList[userList.length - 1].id + 1;
      }
      // console.log(userList);
      // console.log(userList.length);

      const signupUser = await User.create({
        id,
        email,
        pw,
        name,
        desc,
        address,
        privateKey,
      }); // 일단 선언은 signupUser로 해둠,,
      return res
        .status(200)
        .json({ message: '회원가입이 성공적으로 완료 되었습니다.' });
    }
  }
};
