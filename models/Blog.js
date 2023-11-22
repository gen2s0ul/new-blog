const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const blogSchema = new Schema({
    title : {
        type: String ,
        required: true
    },
    body : {
        type: String,
        required: true
    },
    author : {
        type: mongoose.Schema.ObjectId,
        ref : User,
        required: true
    }
})

// blog model
const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog