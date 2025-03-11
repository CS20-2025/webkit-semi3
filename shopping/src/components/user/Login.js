import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', user);
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert('로그인 실패');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
                <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
