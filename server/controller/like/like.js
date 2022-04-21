// like 좋아요
module.exports = {
  post: (req, res) => {
    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'like ok' });
    }
  },
};
