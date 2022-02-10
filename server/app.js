const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config({path:'./config.env'});
require('./DB/conn');
// const User = require('./model/userSchema');

app.use(express.json())

app.use(require('./router/auth'))

const PORT = process.env.PORT;

//middelware

const middelware = (res,req,next) => {
    console.log("Hello wordl middelware");
    next();

}

app.get('/about',middelware, (req, res) => {
    res.send("Hello about world");
})

app.get('/contact', (req, res) =>{
    res.cookie("test","kartik");
    res.send("Hello contact");
})
app.get('/signin', (req, res) =>{
    res.send("Hello signin");
})
app.get('/signup', (req, res) =>{
    res.send("Hello signup");
})

app.listen(PORT, () => {
    console.log( `server running on ${PORT}` );
})

