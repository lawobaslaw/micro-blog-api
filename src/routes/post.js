const express = require('express');
const router = new express.Router();
const Post = require('../model/Post');
const authGuard = require('../middleware/authGuard');


// Add post user route
router.post('/post/add', authGuard, async (req, res) => {
    try {
        const incomingData = req.body;
        incomingData.dateCreated = new Date()
        incomingData.postedBy = req.user._id;
        const newPost = new Post(incomingData);
        await newPost.save();

        res.status(201).json({
            message: "Posted Successfully",
            data: newPost

        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

// Get all post user route
router.get('/post/all', authGuard, async (req, res) => {
    try {
        // destructure _id const { _id } = user._id;

        //thats the destructure format req.user._id
        const posts = await Post.find({ postedBy: req.user._id });
        const postCount = await Post.countDocuments({ postedBy: req.user._id });

        res.status(201).json({
            message: "Successful",
            data: posts,
            postCount
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports = router;