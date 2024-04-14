const { Schema, model } = require('mongoose')

const problemSchema = new Schema({

    name: String,
    intro: String,
    description: String,
    difficulty: {
        type: String,
        enum: ["basic", "easy", "medium", "hard"]
    },
    runCases: String,
    runOutput: String,
    input: String,
    output: String,
    cSolution: String,
    cppSolution: String,
    javaSolution: String,
    pythonSolution: String,

});

const Problem = model('Problem', problemSchema);
module.exports = Problem