const express = require('express');
const cors = require('cors');
const usersRouter = require('./router/users');

const app = express();

// CORS 설정
// GET, POST, OPTIONS 허용
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

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
