import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { removeMultipleFromCart } = useCart();

    const selectedProducts = location.state?.selectedProducts || [];

    // 선택한 상품 총 합계
    const totalAmount = selectedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePayment = () => {
        if (selectedProducts.length === 0) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        // 결제 완료 처리
        alert('선택한 상품의 결제가 완료되었습니다!');

        // 선택된 상품 장바구니에서 삭제
        const selectedIds = selectedProducts.map((item) => item.id);
        removeMultipleFromCart(selectedIds);

        // 결제 후 메인 페이지로 이동
        navigate('/cart');
    };

    return (
        <div>
            <h1>결제 페이지</h1>
            {selectedProducts.length === 0 ? (
                <p>선택된 상품이 없습니다.</p>
            ) : (
                <div>
                    <ul>
                        {selectedProducts.map((item) => (
                            <li key={item.id} style={{ marginBottom: '15px' }}>
                                <h3>{item.name}</h3>
                                <p>수량: {item.quantity}</p>
                                <p>가격: {item.price} 원</p>
                            </li>
                        ))}
                    </ul>
                    <h2>총 합계: {totalAmount.toLocaleString()} 원</h2>
                    <button
                        onClick={handlePayment}
                        style={{
                            padding: '10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            width: '100%',
                            marginTop: '20px',
                        }}
                    >
                        결제하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default Checkout;
