import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function GongJi() {
    const [notices, setNotices] = useState([]);

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
                        <tr key={notice.id}>
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
