import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    // 선택된 상품의 ID 저장
    const handleSelect = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((itemId) => itemId !== id) : [...prevSelected, id]
        );
    };

    // 선택한 상품만 필터링
    const selectedProducts = cartItems.filter((item) => selectedItems.includes(item.id));

    // 선택한 상품 총 금액
    const totalAmount = selectedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 선택한 상품만 결제 페이지로 이동
    const handleCheckout = () => {
        if (selectedProducts.length === 0) {
            alert('결제할 상품을 선택하세요.');
            return;
        }
        navigate('/checkout', { state: { selectedProducts } });
    };

    return (
        <div>
            <h1>장바구니</h1>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있습니다.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleSelect(item.id)}
                                    style={{ marginRight: '10px' }}
                                />
                                <strong>{item.name}</strong> (가격: {item.price}원, 수량: {item.quantity})
                                <div style={{ marginTop: '10px' }}>
                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <button onClick={() => increaseQuantity(item.id)} style={{ marginLeft: '5px' }}>
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            marginLeft: '5px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                        }}
                                    >
                                        제거
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>선택한 상품 총 합계: {totalAmount.toLocaleString()} 원</h2>
                    <button
                        onClick={handleCheckout}
                        style={{
                            padding: '10px',
                            marginTop: '20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            width: '100%',
                        }}
                    >
                        선택한 상품 결제하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
