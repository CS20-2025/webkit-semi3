import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', user);
            alert(response.data.message);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert('서버 연결 실패');
            }
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="이름" onChange={handleChange} required />
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
                <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Register;
