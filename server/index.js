const express = require('express');
const usersRouter = require('./router/users');

const app = express();

app.get('/', (req, res) => {
  res.send('hello node');
});

/* 
POST https://localhost:4000/signin,
GET https://localhost:4000/signout,
POST https://localhost:4000/signup
*/
app.use('/', usersRouter);

app.listen(4000, () => console.log('4000번 포트에서 대기중'));
