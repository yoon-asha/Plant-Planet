// signout
module.exports = {
  get: (req, res) => {
    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'signout ok' });
      // return res.status(200).json({ message: 'ok' });
    }
  },
};
