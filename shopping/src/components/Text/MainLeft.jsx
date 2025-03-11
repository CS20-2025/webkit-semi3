import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainLeft = () => {
    const [boardPosts, setBoardPosts] = useState([]);

    useEffect(() => {
        fetchBoardPosts();
    }, []);

    const fetchBoardPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/board');
            setBoardPosts(res.data);
        } catch (error) {
            console.error('자유게시판 데이터를 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div className="w-full md:w-1/2 p-4 border-r border-gray-300">
            <h2 className="text-2xl font-bold mb-4">자유게시판</h2>
            <ul>
                {boardPosts.length > 0 ? (
                    boardPosts.map((post, index) => (
                        <li key={index} className="p-2 border-b">
                            📝 {post.title}
                        </li>
                    ))
                ) : (
                    <li className="p-2">게시글이 없습니다.</li>
                )}
            </ul>
        </div>
    );
};

export default MainLeft;
