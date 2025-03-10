// import logo from './logo.svg';
// import './App.css';
import './components/FashionInformaiton/Fashion.css';
import FashionInformation from './components/FashionInformaiton/FashionInformation';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Home from './components/Home';
import GongJi from './components/Gongji/GongJi';

function App() {
    return (
        <div className="container py-4 text-center">
            <BrowserRouter>
                <Container>
                    <Row>
                        <Col>
                            <Header></Header>
                            <Routes>
                                <Route path="/Home" element={<Home></Home>}></Route>
                                <Route
                                    path="/FashionInformation"
                                    element={<FashionInformation></FashionInformation>}
                                ></Route>
                                <Route path="/GongJi" element={<GongJi></GongJi>}></Route>
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
