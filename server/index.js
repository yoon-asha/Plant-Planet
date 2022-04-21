require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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

// Test
app.get('/', (req, res) => {
  res.send('hello node');
});

/* 
POST http://localhost:4000/signin,
GET http://localhost:4000/signout,
POST http://localhost:4000/signup
*/
app.use('/', usersRouter);

// Connect mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

// 4000 Port Check
app.listen(4000, () => console.log('4000번 포트에서 대기중'));
