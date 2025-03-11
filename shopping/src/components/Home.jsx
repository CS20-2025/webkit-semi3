import React from 'react';
import Header from './Header';
import MainLeft from './Text/MainLeft';
import MainRight from './Text/MainRight';
const Home = () => {
    return (
        <div id="wrap" className="flex flex-col min-h-screen">
            {/* Header */}

            {/* Main Content */}
            <main className="flex-grow p-4 flex flex-col md:flex-row">
                {/* 왼쪽 (커뮤니티) */}
                <MainLeft />

                {/* 오른쪽 (코디 평가) */}
                <MainRight />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center mt-auto">Copyright © 2025</footer>
        </div>
    );
};

export default Home;
