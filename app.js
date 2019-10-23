const express = require('express');
const app = express();

const mongoose = require('mongoose')


const port = 3000;

app.get('/', (req, res)=> res.send('Hello World'))

// Connect to DB
mongoose.connect(
    'mongodb://root:example@localhost:27017/knights',
    {useNewUrlParser: true},
    ()=>{
        console.log('Connected to DB!')
    }
)

app.listen(port, () => console.log(`Example app running on port ${port}!`))