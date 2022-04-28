const Web3 = require('web3');
const erc721Abi = require('../../contract/erc721Abi');
const erc20Abi = require('../../contract/erc20Abi');
const { Post, User } = require('../../models');

const INFURA_URL = process.env.INFURA_URL;
const ERC721_ADDR = process.env.ERC721_ADDR;
const ERC20_ADDR = process.env.ERC20_ADDR;
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
      // ** Contract 설정 **
      const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
      // ** ERC20 Contract Logic **
      web3.eth.accounts.wallet.add(userInfo.privateKey);
      const erc20Contract = await new web3.eth.Contract(erc20Abi, ERC20_ADDR, {
        from: address,
      });
      erc20Contract.methods
        .transfer(EXCHANGE_ADDR, '5000000000000000000')
        .send({ gasLimit: 200000 });
      // ** ERC721 Contract Logic **
      await web3.eth.accounts.wallet.add(PRIVATE_KEY);
      const erc721Contract = await new web3.eth.Contract(
        erc721Abi,
        ERC721_ADDR,
        {
          from: EXCHANGE_ADDR,
        }
      );
      const erc721Gas = await erc721Contract.methods
        .mintNFT(address, url)
        .estimateGas();
      await erc721Contract.methods
        .mintNFT(address, url)
        .send({ gasLimit: erc721Gas });

      // **DB에 저장하는 Logic**
      await User.findOneAndUpdate(
        { address: address },
        { $inc: { token: -5 } }
      );

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
