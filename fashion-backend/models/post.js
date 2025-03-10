const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String,
    desc: String,
    src: String,
    author: String,
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', PostSchema);
