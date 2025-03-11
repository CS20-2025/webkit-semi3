import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GongJi() {
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate(); //페이지 이동을 위함

    // 백엔드 API에서 데이터 가져오기
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/notices')
            .then((response) => {
                setNotices(response.data);
            })
            .catch((error) => {
                console.error('공지사항 데이터 가져오기 실패', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">공지사항</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>번호</th>
                        <th style={{ width: '60%' }}>제목</th>
                        <th style={{ width: '15%' }}>조회수</th>
                        <th style={{ width: '15%' }}>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((notice, index) => (
                        <tr
                            key={notice.id} //해당 공지사항 게시글의 id
                            onClick={() => navigate(`/notice/${notice.id}`)} //클릭 시 상세 페이지 이동
                            style={{ cursor: 'pointer' }} //마우스 오버 시 클릭 가능하게 표시
                        >
                            <td>{index + 1}</td>
                            <td>{notice.title}</td>
                            <td>{notice.views}</td>
                            <td>{new Date(notice.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
