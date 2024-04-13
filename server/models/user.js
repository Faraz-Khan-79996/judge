const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
    email :{
        type : String,
    }
})


userSchema.plugin(passportLocalMongoose)
//passport-local-mongoose will add 'username', 'hash' and 'salt' fields in schema.
//it will also add methods to your schema. See the docs

module.exports = mongoose.model("User" , userSchema)

