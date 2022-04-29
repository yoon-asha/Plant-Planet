const { User } = require('../../models');

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5); // 객체 섞어주기
}

module.exports = async (req, res) => {
  const { address } = req.body;
  const randomList = await User.find({
    address: { $nin: address }, // 해당 address 만 제외
  });

  shuffle(randomList); // address 제외하고 남은 객체의 배열순서 랜덤적용

  let fiveRecomList;
  if (randomList.length < 5) {
    fiveRecomList = randomList;
  } else {
    fiveRecomList = randomList.slice(0, 5);
  }

  return res.json({
    success: true,
    data: { recomList: fiveRecomList },
    message: '추천리스트가 성공적으로 전달되었습니다',
  });
};

// userList 에서 랜덤한 5명 추천목록에 보이기
// 본인은 제외하기
// name, desc, 가능하면img 까지
// 좋아요 추후 생각
