const Web3 = require('web3');
const { User } = require('../../models');

const INFURA_URL = process.env.INFURA_URL;

// signup
module.exports = async (req, res) => {
  const { email, pw, name, desc } = req.body;

  if (!email || !pw || !name || !desc) {
    return res.status(422).json({ message: '회원정보를 모두 입력해주세요.' });
  } else {
    const userEmail = await User.findOne({ email: email }); // 이메일이 DB에 존재하는지 검증
    const userName = await User.findOne({ name: name }); // 유저의 닉네임 중복 여부 검증

    if (userEmail) {
      // 만약 이메일이 DB에 존재한다면 -> 중복 에러처리
      return res.status(409).json({ message: '사용중인 이메일이 있습니다.' });
    } else if (userName) {
      return res.status(409).json({ message: '사용중인 닉네임이 있습니다.' });
    } else {
      // 모든 조건이 충족되면 지갑을 생성하고, DB에 create.

      // ropsten 연결
      const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

      const { address, privateKey } = web3.eth.accounts.create();

      // id 설정 로직
      const userList = await User.find();
      let id;

      if (userList.length === 0) {
        id = 1;
      } else {
        id = userList[userList.length - 1].id + 1;
      }

      await User.create({
        id,
        email,
        pw,
        name,
        desc,
        address,
        privateKey,
      });
      return res
        .status(200)
        .json({ message: '회원가입이 성공적으로 완료 되었습니다.' });
    }
  }
};
