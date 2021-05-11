const mongoose = require('mongoose');
require('dotenv').config();

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a Title']
    },
    body: {
        type: String,
        required: [true, 'Please add a Body']

    },
    category: {
        type: String,
        required: [true, 'Please add a Category']
    },
    tag: {
        type: String
    },

    dateCreated: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },


});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;