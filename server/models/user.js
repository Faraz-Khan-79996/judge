const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
    email: {
        type: String,
    },
    solved: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }],
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false // Default value is false
    },
    likedProblems : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }],
        unique: true
    },
    dislikedProblems : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }],
        unique: true
    },
    submissions : {
        type : [{
            type: Schema.Types.ObjectId,
            ref: 'Submission'
        }]
    },
    saved : {
        type : [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }]
    },
    
},{
    timestamps : true,
})


userSchema.plugin(passportLocalMongoose)
//passport-local-mongoose will add 'username', 'hash' and 'salt' fields in schema.
//it will also add methods to your schema. See the docs

const User = mongoose.model("User" , userSchema)
module.exports = User

