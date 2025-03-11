import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [fashionPosts, setFashionPosts] = useState([]);

    useEffect(() => {
        // 상품 목록 가져오기
        axios
            .get('http://localhost:5000/api/products')
            .then((res) => {
                const sortedProducts = res.data.sort((a, b) => new Date(a.date) - new Date(b.date)); // 오래된 순 정렬
                setProducts(sortedProducts.slice(-3)); // 가장 나중에 등록된 3개 가져오기
            })
            .catch((err) => console.error('상품 데이터 오류:', err));

        // 패션정보 게시글 가져오기
        axios
            .get('http://localhost:5000/api/posts')
            .then((res) => {
                const sortedPosts = res.data.sort((a, b) => new Date(a.date) - new Date(b.date)); // 오래된 순 정렬
                setFashionPosts(sortedPosts.slice(-3)); // 가장 나중에 등록된 3개 가져오기
            })
            .catch((err) => console.error('패션정보 데이터 오류:', err));
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                {/* 쇼핑 정보 섹션 */}
                <Col md={4}>
                    <h4>쇼핑 정보</h4>
                    {products.map((product) => (
                        <Card key={product.id} className="mb-2">
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price} 원</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    <Link to="/products">
                        <Button variant="primary" size="sm">
                            더보기
                        </Button>
                    </Link>
                </Col>

                {/* 패션 정보 섹션 */}
                <Col md={4} style={{ width: '30%', border: '1px solid black', padding: '10px' }}>
                    <h4>패션 정보</h4>
                    {fashionPosts.map((post) => (
                        <Card key={post.id} className="mb-2">
                            <Card.Body>
                                <Card.Title>{post.name}</Card.Title>
                                <Card.Text>{post.desc}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    <Link to="/fashion">
                        <Button variant="primary" size="sm">
                            더보기
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}
