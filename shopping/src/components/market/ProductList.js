import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom'; // useNavigate 삭제

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart, cartItems } = useCart(); // 장바구니 함수와 데이터 가져오기

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('상품 목록 가져오기 실패:', error);
            });
    }, []);

    // 장바구니에 담기만 하는 함수 (이동 없음)
    const handleAddToCart = (product) => {
        addToCart(product); // 장바구니에 담기
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* 상단 바 */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <h1 style={{ margin: 0 }}>상품 목록</h1>
                <Link
                    to="/cart"
                    style={{
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '18px',
                        backgroundColor: '#f8f9fa',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                >
                    장바구니 🛒 ({cartItems.length})
                </Link>
            </div>

            {/* 상품 목록 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            width: '200px',
                            borderRadius: '8px',
                        }}
                    >
                        <h3>{product.name}</h3>
                        <p>{product.price} 원</p>
                        <button
                            onClick={() => handleAddToCart(product)} // 이동 없이 장바구니에 담기만
                            style={{
                                padding: '8px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                width: '100%',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            장바구니에 담기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
