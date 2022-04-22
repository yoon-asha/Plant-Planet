const Web3 = require('web3');
const erc721Abi = require('../../contract/erc721Abi');
const { Post } = require('../../models');

const newErc721addr = '0x7834aA28c8A59f1E1F0B345b1964d0E5731Ec555';

// post 게시물 작성
module.exports = {
  post: async (req, res) => {
    const { url, desc, address, name } = req.body;

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/3e7fc300378c4dc59f66d6858e70e4b4'
      )
    );

    web3.eth.accounts.wallet.add(
      'effe435d4fcbc651ab523f146cb1a23f01f9ba2ed165ed23b12ece2e81990514'
    );

    // address 거래소 계정
    const contract = await new web3.eth.Contract(erc721Abi, newErc721addr, {
      from: address,
    });

    // address 로그인 계정
    const gas = await contract.methods.mintNFT(address, url).estimateGas();
    console.log(gas);

    // address 로그인 계정
    const newTokenId = contract.methods
      .mintNFT(address, url)
      .send({ gasLimit: gas });
    console.log(newTokenId);

    // 게시물 가져올때
    // DB꺼 가져올지 속도는 빠름 하지만 가짜 <-
    // contract 뒤져서 가져올지 느림 하지만 진짜

    // address 기준으로 user_id 찾기

    // 사용자가 작성한 시간 파악하기 (모름)

    // DB에 post 저장
    // const post = new Post({
    //   id: newTokenId,
    //   address: address,
    //   name: name,
    //   url: url,
    //   desc: desc,
    // });

    // post.save().then(() => console.log('post saved successfully'));

    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'post ok' });
    }
  },
};
