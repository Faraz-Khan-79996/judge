const express = require('express')
const router = express.Router()
const passport = require('passport')
const userMiddleware = require('../middlewares/userMiddleware')
// const userController = require('../controller/user.js')
const User = require('../models/user')
const ExpressError = require('../utils/ExpressError')


router.post('/signup', async (req, res) => {
    try {
        console.log("/signup req received");
        let { username, password , email} = req.body
        // console.log(req.body);
        const new_user = new User({ username , email });
        const userDoc = await User.register(new_user, password)//will automatically check if username is unique or not.
        //register() method added by passport-local-mongoose
        //will register user in database as well.

        //login the user after signup
        req.login(userDoc, (err) => {
            if (err) {
                throw new ExpressError(500, err.message, "login failure after signup")
            }
            res.json(userDoc)
        })
    } catch (error) {

        const customError = new ExpressError(error.status ? error.statusCode : 400, error.message, error.type ? error.type : error.name)
        res.status(customError.statusCode).json(customError)
    }
})

//req.body should have 'username' and password from frontend
router.post('/login',passport.authenticate("local"), (req, res) => {
    res.json(req.user)
})

router.get('/logout', (req, res) => {
    try {
        //This method is by 'passport'. it takes a callback with error parameter.
        // will remove req.user and remove user from session
        req.logout((err) => {
            if (err) {
                throw err
            }
            res.status(200).json("logged out")
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

router.get('/profile' , userMiddleware.isLoggedIn ,(req , res)=>{
    res.json(req.user)
})

router.get('/users' , async(req , res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router

