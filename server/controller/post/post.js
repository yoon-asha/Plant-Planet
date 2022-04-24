const Web3 = require('web3');
const erc721Abi = require('../../contract/erc721Abi');
const { Post, User } = require('../../models');

const infuraUrl =
  'https://ropsten.infura.io/v3/3e7fc300378c4dc59f66d6858e70e4b4';
const newErc721addr = '0x7834aA28c8A59f1E1F0B345b1964d0E5731Ec555';
const privateKey =
  'effe435d4fcbc651ab523f146cb1a23f01f9ba2ed165ed23b12ece2e81990514';

const exAddress = '0x6599Ec2d9aEfD79C58075b70217aF324AeD8D68C';

// post 게시물 작성
module.exports = {
  post: async (req, res) => {
    const { url, desc, address, name } = req.body;

    const userInfo = await User.findOne({ address: address });

    if (!userInfo) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      // **Contract 관련 Logic**
      const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
      web3.eth.accounts.wallet.add(privateKey);
      // exAddress 거래소 계정
      const contract = await new web3.eth.Contract(erc721Abi, newErc721addr, {
        from: exAddress,
      });
      // address 로그인 계정
      const gas = await contract.methods.mintNFT(address, url).estimateGas();
      // Mint 과정
      // address 로그인 계정
      // Pending 끝날때까지 기다릴까?
      const newTokenId = await contract.methods
        .mintNFT(address, url)
        .send({ gasLimit: gas });
      console.log(newTokenId);

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
      await Post.create({ id, user_id: userInfo.id, address, name, url, desc });

      return res.status(200).json({ message: 'post ok' });
    }

    // Case 게시물 가져올 때
    // DB꺼 가져올지 속도는 빠름 (하지만 가짜) <- 선택
    // contract 뒤져서 가져올지 느림 (하지만 진짜)

    // 사용자가 작성한 시간 파악하기 (모름)
  },
};
