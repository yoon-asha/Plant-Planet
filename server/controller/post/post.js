const Web3 = require('web3');
const erc721Abi = require('../../contract/erc721Abi');
const { Post, User } = require('../../models');

const INFURA_URL = process.env.INFURA_URL;
const ERC721_ADDR = process.env.ERC721_ADDR;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EXCHANGE_ADDR = process.env.EXCHANGE_ADDR;

// post 게시물 작성
module.exports = async (req, res) => {
  const { name, desc, address, url } = req.body;

  const userInfo = await User.findOne({ address: address });

  if (!userInfo) {
    // 아마 걸리지 않을듯(이미 미들웨어로 검증)
    return res
      .status(400)
      .json({ success: false, data: null, message: '권한이 없습니다' });
  } else {
    try {
      // **Contract 관련 Logic**
      const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
      web3.eth.accounts.wallet.add(PRIVATE_KEY);
      // 거래소 계정
      const contract = await new web3.eth.Contract(erc721Abi, ERC721_ADDR, {
        from: EXCHANGE_ADDR,
      });
      // 로그인 계정
      const gas = await contract.methods.mintNFT(address, url).estimateGas();
      // Mint 과정
      // 로그인 계정
      // Pending 끝날때까지 기다릴까? <- 기다리지 말자
      // const newTokenId = await contract.methods
      //   .mintNFT(address, url)
      //   .send({ gasLimit: gas });
      // console.log(newTokenId);

      contract.methods.mintNFT(address, url).send({ gasLimit: gas });

      // **DB에 저장하는 Logic**
      const postList = await Post.find();

      // id 만들기
      let id;
      if (postList.length === 0) {
        id = 1;
      } else {
        id = postList[postList.length - 1].id + 1;
      }

      // DB에 저장
      await Post.create({
        id,
        userID: userInfo.id,
        name,
        desc,
        address,
        url,
      });

      // 사용자가 작성한 시간 파악하기 (모름)

      return res.status(200).json({
        success: true,
        data: null,
        message: '포스트 게시가 완료되었습니다',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ success: false, data: null, message: e });
    }
  }
};
