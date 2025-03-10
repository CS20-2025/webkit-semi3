import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/Home">
                    CS20 프로젝트
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/FashionInformation">
                            패션정보
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Market">
                            짭신사
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Gongji">
                            공지사항
                        </Nav.Link>
                        <NavDropdown title="커뮤니티" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">코디평가</NavDropdown.Item>
                            <NavDropdown.Item href="#">자유게시판</NavDropdown.Item>
                            <NavDropdown.Item href="#">패션게시판</NavDropdown.Item>
                            <NavDropdown.Item href="#">쇼핑몰 추천 코디</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
