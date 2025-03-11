import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function NoticeDetail() {
    const { id } = useParams(); //URL에서 공지사항 ID 가져오기
    const [notice, setNotice] = useState([]);

    //공지사항의 게시글 id 번호에 맞는 상세정보화면 불러오기
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/notices/${id}`)
            .then((response) => {
                setNotice(response.data);
            })
            .catch((err) => {
                console.log('게시글 상세 정보 가져오기 실패', err);
            });
    }, [id]);
    if (!notice) return <div className="container mt-5">📌 공지사항을 불러오는 중...</div>;

    return (
        <div className="container mt-5">
            <h1>{notice.title}</h1>
            <p>
                <strong>날짜:</strong> {new Date(notice.date).toLocaleDateString()}
            </p>
            <p>
                <strong>조회수:</strong> {notice.views}
            </p>
            <hr />
            <p>{notice.content}</p>
        </div>
    );
}
