// signout
const session = require('express-session');
module.exports = {
  // signout
  // session 삭제

  post: (req, res) => {
    if (!req.session.email) {
      res.status(400).json({ message: 'not authorized' });
      console.log(req.session)
    } else {
      req.session.destroy(() => {
        res.status(200).send({ message: 'Destoryed on session ' });
        console.log(req.session)
      })

      // return res.status(200).json({ message: 'ok' });
    }

  },
};
