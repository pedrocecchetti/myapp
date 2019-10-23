const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express');
const KnightsRoutes = require('./routes/knights')

const app = express();

app.use(bodyParser.json())
app.use('/knights', KnightsRoutes)

// Connect to DB
mongoose.connect(
    'mongodb://mongod:123456789@localhost:27017/knights',
    {useNewUrlParser: true},
    ()=>{
        console.log('Connected to DB!')
    }
)

const port = 3000;
app.listen(port, () => console.log(`Example app running on port ${port}!`))