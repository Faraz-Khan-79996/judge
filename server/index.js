const express = require('express');
const path = require('path')
const fs = require('fs')
const { spawn, exec } = require('child_process');
const cors = require('cors');
const app = express();
const { v4: uuid } = require("uuid");
const port = process.env.PORT || 3000;

const {generateFile , extension , executeCpp , compileCpp} = require('./utils/methods');
const {executePython} = require('./utils/pythonExecutor')
const {compileJava , executeJava} = require('./utils/javaExecutor')

app.use(cors())
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))


app.post("/compile", (req, res) => {
    console.log("req received");
    const fileName = 'example.cpp';
    const filePath = path.join(__dirname, fileName);

    const { code } = req.body;
    // Write code to file
    // console.log(code);
    // res.json(code)
    // return;
    fs.writeFileSync(filePath, code);

    // console.log(filePath);
    // Compile the C++ code

    const CorrectOutput = fs.readFileSync('./output.txt', { encoding: 'utf8', flag: 'r' });
    const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
    // console.log(input);
    // console.log(CorrectOutput);

    const compileProcess = spawn('g++', ['example.cpp', '-o', 'temp']);

    compileProcess.on('exit', (code) => {
        if (code === 0) {

            try {
                // Compilation successful, run the program
                const runProcess = spawn('./temp');

                // Provide input to the program
                runProcess.stdin.write(input);
                runProcess.stdin.end();

                // Get the output of the program
                let output = '';
                runProcess.stdout.on('data', (data) => {
                    output += data.toString();
                });

                runProcess.on('close', () => {
                    // console.log('Output:', output);
                    console.log(output.trim());
                    console.log(CorrectOutput.trim());
                    if (output.trim() == CorrectOutput.trim()) {
                        res.json({ verdict: true, output, CorrectOutput })
                    }
                    else
                        res.json({ verdict: false, output, CorrectOutput })
                });
            } catch (error) {
                console.log(error);
                res.json(error)
            }


        } else {
            console.error('Compilation failed');
            const error = { message: 'Compilation failed' }
            res.json(error)
        }
    });

})

app.post('/api/run' , async(req , res)=>{

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

app.post('/api/submit' , async(req , res)=>{

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

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});