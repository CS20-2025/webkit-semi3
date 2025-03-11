import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Market 컴포넌트
import ProductList from './components/market/ProductList';
import Cart from './components/market/Cart';
import { CartProvider } from './components/market/CartContext';
import Checkout from './components/market/Checkout';

// 패션 정보 컴포넌트
import './components/FashionInformation/Fashion.css';
import FashionInformation from './components/FashionInformation/FashionInformation';

// 공통 컴포넌트
import Header from './components/Header';
import Home from './components/Home';

// 공지사항 컴포넌트
import GongJi from './components/Gongji/GongJi';

// 로그인, 회원가입
import Register from './components/user/Register';
import Login from './components/user/Login';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="container py-4 text-center">
                    <Container>
                        <Row>
                            <Col>
                                {/* 공통 헤더 */}
                                <Header />

                                <Routes>
                                    {/* 공통 페이지 */}
                                    <Route path="/" element={<Home />} />
                                    <Route path="/Home" element={<Home />} />

                                    {/* 패션 정보 */}
                                    <Route path="/FashionInformation" element={<FashionInformation />} />

                                    {/* 공지 사항 */}
                                    <Route path="/GongJi" element={<GongJi />} />

                                    {/* 마켓 */}
                                    <Route path="/market" element={<ProductList />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />

                                    {/* 로그인 회원가입 */}
                                    <Route path="/Login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </Routes>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
