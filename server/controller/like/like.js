const { Favorite } = require('../../models');
const { Post } = require('../../models');

const Web3 = require('web3');
const erc20Abi = require('../../contract/erc20Abi');
const INFURA_URL = process.env.INFURA_URL;
const EXCHANGE_ADDR = process.env.EXCHANGE_ADDR;
const ERC20_ADDR = process.env.ERC20_ADDR;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// like 좋아요 기능

module.exports = async (req, res) => {
  const { user_id, post_id } = req.body;
  const liker = await Favorite.findOne({ user_id: user_id, post_id: post_id });

  if (!liker) {
    // 유저가 좋아요 누른 게시물이 아니라면 좋아요 +1 실행 후 DB에 create.
    const favoriteList = await Favorite.find();
    const findPost = await Post.findOne({ id: post_id }); // 해당 게시물을 찾고 -> address 주소값을 찾는다
    const address = findPost.address;
    // console.log(address);

    const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL)); // web3에 연결
    web3.eth.accounts.wallet.add(PRIVATE_KEY); // 권한 설정
    const erc20Contract = new web3.eth.Contract(erc20Abi, ERC20_ADDR, {
      from: EXCHANGE_ADDR,
    }); // contract와 연결
    erc20Contract.methods
      .transfer(address, '1000000000000000000')
      .send({ gasLimit: 200000 }); // 토큰을 지급하는 로직.
    // 갯수 단위를 찾아서 회원가입 10개, 좋아요는 1개 ->

    let id; // id를 설정.
    if (favoriteList.length === 0) {
      id = 1;
    } else {
      id = favoriteList[favoriteList.length - 1].id + 1;
    }

    await Favorite.create({ id: id, user_id: user_id, post_id: post_id });
    await Post.findOneAndUpdate({ id: post_id }, { $inc: { count: 1 } }); // 좋아요 개수 + 1을 update.
    res.status(200).json({ message: '좋아요가 성공적으로 완료되었습니다' });
  } else {
    res.status(404).json({ message: '좋아요가 실패했습니다' });
  }
};
