const Problem = require('../models/problem')
const User = require('../models/user')
const Submission = require('../models/submission')
const ExpressError = require('../utils/ExpressError')
const express = require('express')

const router = express.Router()

router.get('/site/info' , async (req , res)=>{
    try {
        
        let AllProblems = await Problem.find().select('difficulty')
        let AllUsers = await User.find().select('createdAt')
        let AllSubmissions = await Submission.find().select('createdAt language status')
        
        let problems = {
            total : AllProblems.length,
            basic : AllProblems.filter(p => p.difficulty == "basic").length,
            easy : AllProblems.filter(p => p.difficulty == "easy").length,
            medium : AllProblems.filter(p => p.difficulty == "medium").length,
            hard : AllProblems.filter(p => p.difficulty == "hard").length,
        }
        let userInfo = {
            count : AllUsers.length,
            users : AllUsers.map(u => u.createdAt),
        }
        let submissionInfo = {
            total : AllSubmissions.length,
            accepted : AllSubmissions.filter(s => s.status == "Accepted").length,
            rejected : AllSubmissions.filter(s => s.status == "Rejected").length,
            dates : AllSubmissions.map(s => s.createdAt)
        }

        res.status(200).send({problems , userInfo , submissionInfo})

    } catch (error) {
        res.send(500).send(error)
    }
})

module.exports = router 
