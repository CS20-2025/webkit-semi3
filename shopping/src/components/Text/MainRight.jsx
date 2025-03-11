import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainRight = ({ fetchPostsTrigger }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPostsTrigger]); // fetchPostsTrigger가 변경될 때마다 실행

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data);
        } catch (error) {
            console.error('게시물을 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">코디 평가</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-md">
                        <img src={post.src} alt={post.name} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-xl font-bold mt-2">{post.name}</h2>
                        <p className="text-sm text-gray-600">{post.desc}</p>
                        <p className="text-xs text-gray-500 mt-1">작성자: {post.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainRight;
