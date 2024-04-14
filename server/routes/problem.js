const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')
const app = express();
require('dotenv').config()
const Problem = require('../models/problem')

const {generateFile , extension , executeCpp , compileCpp} = require('../utils/methods');
const {executePython} = require('../utils/pythonExecutor')
const {compileJava , executeJava} = require('../utils/javaExecutor');
const Submission = require('../models/submission');
const User = require('../models/user')
const { isLoggedIn } = require('../middlewares/userMiddleware');




router.post('/run' , async(req , res)=>{

    try {

        console.log("req received");
        console.log("req at /api/run");

        const {code , language , inputValue} = req.body.payload;
        const filePath = await generateFile(code , extension[language])

        let output;

        if(language == "cpp" || language=="c"){
            const jobId = await compileCpp(filePath)
            output = await executeCpp(jobId , inputValue)
        }
        else if(language == "python"){
            output = await executePython(filePath , inputValue)
        }
        else if(language == "java"){
            const filename = await compileJava(filePath)
            output = await executeJava(filename , inputValue)
        }
        res.json({code , output})        
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error)
    }
})

router.post('/submit' , async(req , res)=>{

    try {

        console.log("req at /api/submit");

        const {code , language} = req.body.payload;
        const filePath = await generateFile(code , extension[language])

        let output;
        const input = fs.readFileSync('./testcases/input.txt', { encoding: 'utf8', flag: 'r' });
        const finalOutput = fs.readFileSync('./testcases/output.txt', { encoding: 'utf8', flag: 'r' });
        CorrectOutput = finalOutput.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        // CorrectOutput = finalOutput

        if(language == "cpp" || language == "c"){
            const jobId = await compileCpp(filePath)
            output = await executeCpp(jobId , input)
        }
        else if(language == "python"){
            output = await executePython(filePath , input)
        }
        else if(language == "java"){
            const filename = await compileJava(filePath)
            output = await executeJava(filename , input)
        }
        console.log("completed");
        if(output.trim() == CorrectOutput.trim()){
            res.json({verdict : true , output , CorrectOutput})
        }
        else{
            res.json({verdict : false , output , CorrectOutput})
        }
    } catch (error) {
        console.log(error);
        res.status(error.statusCode && 500).json(error)
    }
})

router.get('/problems' , async(req , res)=>{
    try {
        const problems = await Problem.find()
        res.json(problems)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/problem/:id' , async(req , res)=>{
    try {
        const {id} = req.params;
        const problems = await Problem.findById(id)
        res.json(problems)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/submit/:id' , isLoggedIn ,async(req , res)=>{
    const {code , language} = req.body.payload;
    const {id} = req.params;

    const submission = new Submission({
        user : req.user.username,
        language,
        code,
        problemId : id,
        userId : req.user._id,
        email : req.user.email,
    })
    try {
        
        console.log("req at /api/submit/:id");  

        
        const filePath = await generateFile(code , extension[language])

        let output;
        const problemDoc = await Problem.findById(id)
        const CorrectOutput = problemDoc.output
        const input = problemDoc.input

        submission.problemName = problemDoc.name;

        if(language == "cpp" || language == "c"){
            const jobId = await compileCpp(filePath)
            output = await executeCpp(jobId , input)
        }
        else if(language == "python"){
            output = await executePython(filePath , input)
        }
        else if(language == "java"){
            const filename = await compileJava(filePath)
            output = await executeJava(filename , input)
        }
        console.log("completed");
        output = output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');


        if(output.trim() == CorrectOutput.trim()){
            submission.status = "Accepted"
            submission.message = "Correct Output"
            const submissionDoc = await submission.save()
            res.json({verdict : true , output , CorrectOutput , submissionDoc})
            await User.findByIdAndUpdate(req.user._id, { $addToSet: { solved: id }})
        }
        else{
            submission.status = "Rejected"
            submission.message = "Wrong Answer"
            const submissionDoc = await submission.save()
            res.json({verdict : false , output , CorrectOutput , submissionDoc})
            
        }
    } catch (error) {
        console.log(error);
        
        submission.status = "Rejected"
        submission.message = "Compilation Error"
        const submissionDoc = await submission.save()
        error.submissionDoc = submissionDoc
        res.status(error.statusCode ? error.statusCode : 500).json(error)
    }
})

router.post('/create' , async(req , res)=>{
    try {
        
        res.status(503).json({message : "Owner Of this site has closed this Route."})
        return
        console.log("Create request received!");
        const {problem} = req.body;
        problem.output = problem.output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        // console.log(req.body);

        const problemDoc = await Problem.create(problem)

        res.json(problemDoc)
    } catch (error) {
        res.json(error)
    }
})


module.exports = router