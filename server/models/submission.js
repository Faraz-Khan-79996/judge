const {Schema , model} = require('mongoose')

const submissionSchema = new Schema({

    user : String,
    email : String,
    problemName : String,
    problemId : {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status : {
        type : String, 
        enum : ["Accepted" , "Rejected"]
    },
    message : {
        type : String,
        enum : ["Correct Output" , "Wrong Answer" , "Compilation Error"]
    },
    language : String,
    code : String,
} , {
    timestamps : true,
});

const Submission = model('Submission', submissionSchema);
module.exports = Submission