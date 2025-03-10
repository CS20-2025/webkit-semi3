//게시글 API

const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// 게시글 가져오기
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// 게시글 추가
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

// 게시글 수정
router.put('/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;
