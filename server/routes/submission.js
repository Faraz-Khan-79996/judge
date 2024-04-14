const express = require('express')
const Submission = require('../models/submission')
const router = express.Router()

router.get('/submissions' , async(req , res)=>{
    try {
        const submissions = await Submission.find().sort({createdAt:-1})
        res.json(submissions)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router