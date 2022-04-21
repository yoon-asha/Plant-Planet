const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 3000;



mongoose.connect('mongodb+srv://taekyeom:t123123@cluster0.0hqha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send('<h2>홈화면</h2>')
})


app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`server PORT ${PORT}`)
});