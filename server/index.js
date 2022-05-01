require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const userRouter = require('./router/user');
const likeRouter = require('./router/like');
const postRouter = require('./router/post');

const app = express();

app.get('/', function (req, res) {
  const index = path.join(__dirname, './clinet', 'index.js');
  res.sendFile(index)
})
// CORS 설정
// GET, POST, OPTIONS 허용
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use(
  session({
    key: 'signinData',
    secret: 'testSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

/* 
POST http://localhost:4000/signin,
GET http://localhost:4000/signout,
POST http://localhost:4000/signup
*/

app.use('/', userRouter);
app.use('/', likeRouter);
app.use('/', postRouter);

// Connect mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })

  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

// 4000 Port Check
app.listen(process.env.PORT || 4000, () => console.log('4000번 포트에서 대기중'));
//고정포트 관한 헤로쿠 에러관련 listen 수정