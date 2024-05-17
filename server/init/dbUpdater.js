const mongoose = require('mongoose')
const Problem = require('../models/problem')
const User = require('../models/user')
const Submission = require('../models/submission')
require('dotenv').config({ path: '../.env' });


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("database connected");
}

async function updateProblem() {
    await Problem.updateMany({}, {
        $set: {
            // acceptedSubmissions: 0,
            // rejectedSubmissions: 0,
            // dislikes : [],
            // likes : [],
            acceptanceRate : 100,
        }
    })

    console.log("YUSSS");
}

async function updateUser() {
    await User.updateMany({}, {
        $set: {
            likedProblems: [],
            dislikedProblems: [],
        }
    })

    console.log("YUSSS");
}
async function updateProblemSubmission() {
    const problems = await Problem.find();

    for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];

        id = problem._id
        // console.log(id);
        const countAccept = await Submission.countDocuments({$and :[{ problemId : (id)} , {status : "Accepted"}]})
        const countReject = await Submission.countDocuments({$and :[{ problemId : id} , {status : "Rejected"}]})
        // console.log(submissions);
        // submissions.map(submission => console.log(submission.status))
        console.log(countAccept);
        console.log(countReject);

        await Problem.findByIdAndUpdate(id , {$set : {
            acceptedSubmissions : countAccept ,
            rejectedSubmissions : countReject ,
        }})

        
    }

    // console.log("YUSSS");
}

async function updateTimeStamps() {
    try {
        const currentDate = new Date();

        // Find all documents
        const problems = await Problem.find();

        // Iterate through each document
        for (const problem of problems) {
            const updatedProblem = {
                ...problem.toObject(), // Convert Mongoose document to plain JavaScript object
                updatedAt: currentDate, // Set updatedAt to current date
            };

            // Set createdAt if it doesn't exist
            if (!problem.createdAt) {
                updatedProblem.createdAt = currentDate;
            }

            // Replace the document with the updated one
            await Problem.replaceOne({ _id: problem._id }, updatedProblem);
        }
        console.log('Timestamps added to existing documents.');
        // mongoose.connection.close();
    } catch (error) {
        console.error('Error updating documents:', error);
        // mongoose.connection.close();
    }
}

//set will reset the given values
// updateProblem()
// updateUser()
// updateProblemSubmission()
updateTimeStamps()