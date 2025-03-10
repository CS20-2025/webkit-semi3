import React, { createContext, useContext, useState } from 'react';

// Context 생성
const CartContext = createContext();

// Context 사용 훅
export const useCart = () => useContext(CartContext);

// Provider 컴포넌트
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // 장바구니에 상품 추가
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                // 이미 담긴 상품이면 수량 증가
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // 새 상품 추가
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // 장바구니에서 상품 제거
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // 여러 상품 한 번에 제거 (결제 완료 등)
    const removeMultipleFromCart = (ids) => {
        setCartItems((prevItems) => prevItems.filter((item) => !ids.includes(item.id)));
    };

    // 상품 수량 증가
    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        );
    };

    // 상품 수량 감소 (1개 이하로는 안 내려감)
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
            )
        );
    };

    // Context로 내보낼 함수와 데이터
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                removeMultipleFromCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
