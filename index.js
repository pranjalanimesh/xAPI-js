const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');
const { getUserId, getPosts, getLikingUsers, getReplies } = require('./controllers');
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Get userid with username
app.get('/getUserId', async (req, res) => {
    const userId = await getUserId(req.query.username);
    res.json({ userId });
});

// Get posts of a user
app.get('/getPosts', async (req, res) => {
    const userId = req.query.userId;
    const n = req.query.n||10;
    const posts = await getPosts(userId, n);
    res.json({ posts });
});

// Get users who liked a post
app.get('/getLikingUsers', async (req, res) => {
    const postId = req.query.postId;
    const likingUsers = await getLikingUsers(postId);
    res.json({ likingUsers });
});

// Get users who reply to a post
app.get('/getReplies', async (req, res) => {
    const postId = req.query.postId;
    const replies = await getReplies(postId);
    res.json({ replies });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

