require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json()); // JSON 요청 처리
app.use(cors()); // CORS 설정

// MySQL 연결
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        return;
    }
    console.log('✅ MySQL 연결 완료');
});

// 📌 [1] 모든 게시글 조회 (READ)
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 📌 [2] 새 게시글 추가 (CREATE)
app.post('/api/posts', (req, res) => {
    const { name, desc, src, author, date } = req.body;
    const sql = 'INSERT INTO posts (name, `desc`, src, author, date) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, desc, src, author, date], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

// 📌 [3] 특정 게시글 수정 (UPDATE)
app.put('/api/posts/:id', (req, res) => {
    const { name, desc, src, date } = req.body;
    const sql = 'UPDATE posts SET name=?, `desc`=?, src=?, date=?, isEdited=true WHERE id=?';
    db.query(sql, [name, desc, src, date, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '게시글 수정 완료' });
    });
});

// 📌 [4] 특정 게시글 삭제 (DELETE)
app.delete('/api/posts/:id', (req, res) => {
    const sql = 'DELETE FROM posts WHERE id=?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: '게시글 삭제 완료' });
    });
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 서버 실행 중: http://localhost:${PORT}`));
