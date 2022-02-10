const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const router = express.Router();

require('../DB/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`hello world from the server router js`);
})

// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({
//             error: "Empty filed "
//         })
//     }

//     User.findOne({ email: email})
//         .then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "already email exits "})
//         }
//         const user = new User({  name, email, phone, work, password, cpassword });

//         user.save().then(() =>{
//             res.status(201).json({
//                 message : "save data"
//             }).catch((err) => {
//                 res.status(500).json({
//                     error : "Data Not Save"
//                 })
//             })
//         })
//     }).catch(err => { console.log(err) })
// })



router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({
            error: "Empty filed "
        })
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "already email exits " })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "already email exits " })
        } else {

            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();

            res.status(201).json({ message: " user add successfull" })
        }

    }
    catch (err) {
        console.log(err);
    }
})


router.post('/signin', async (req, res) => {

    try {

        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Pls add data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken",token,{
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            })


            if (!isMatch) {
                res.status(400).json({ message: "User login failed" });
            } else {
                res.json({ message: "User login successful" });
            }
        } else {
            res.status(400).json({error:"Invalid username and password"})
        }

    } catch (err) {
        console.log(err)
    }

});

module.exports = router;