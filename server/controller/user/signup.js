const Web3 = require('web3');
const { User } = require('../../models');
const erc20Abi = require('../../contract/erc20Abi');

const INFURA_URL = process.env.INFURA_URL;
const ERC20_ADDR = process.env.ERC20_ADDR;
const EXCHANGE_ADDR = process.env.EXCHANGE_ADDR;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// signup
module.exports = async (req, res) => {
  const { email, pw, name, desc } = req.body;

  if (!email || !pw || !name || !desc) {
    return res.status(422).json({
      success: false,
      data: null,
      message: '회원정보를 모두 입력해주세요.',
    });
  } else {
    const userEmail = await User.findOne({ email: email }); // 이메일이 DB에 존재하는지 검증
    const userName = await User.findOne({ name: name }); // 유저의 닉네임 중복 여부 검증

    if (userEmail) {
      // 만약 이메일이 DB에 존재한다면 -> 중복 에러처리
      return res.status(409).json({
        success: false,
        data: null,
        message: '사용중인 이메일이 있습니다.',
      });
    } else if (userName) {
      return res.status(409).json({
        success: false,
        data: null,
        message: '사용중인 닉네임이 있습니다.',
      });
    } else {
      // 모든 조건이 충족되면 지갑을 생성하고, DB에 create.
      // ropsten 연결
      const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
      const { address, privateKey } = web3.eth.accounts.create();
      const erc20Contract = new web3.eth.Contract(erc20Abi, ERC20_ADDR, {
        from: EXCHANGE_ADDR,
      });
      // web3 사용해서 contract 가져오기
      // (ERC20 ABI, ERC20 Contract 주소, {Address})
      web3.eth.accounts.wallet.add(PRIVATE_KEY);
      erc20Contract.methods
        .transfer(address, '10000000000000000000')
        .send({ gasLimit: 200000 });
      // gas 20만
      // contract 내부에 들어있는 함수실행 (transfer)
      // to (address), amount (10)

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
      return res.status(200).json({
        success: true,
        data: null,
        message: '회원가입이 성공적으로 완료 되었습니다.',
      });
    }
  }
};
