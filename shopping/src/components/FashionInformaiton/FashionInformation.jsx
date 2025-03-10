// - 사용자들이 가성비, 최저가, 최고품질 등 자신의 인생템을 업로드하고 공유
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { goods } from '../../data-Fashion/FashionData';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaHeart, FaComment } from 'react-icons/fa';
import { BsEye } from 'react-icons/bs';

export default function FashionInformation() {
    const [gods, setGoods] = useState(goods);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedGoods, setDisplayedGoods] = useState(goods); // 검색 결과 반영할 상태

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    };

    //C
    const addGoods = () => {
        let newSrc = window.prompt('새로 업로드할 상품 이미지 URL 입력');
        let newName = window.prompt('상품명 입력');
        let newDesc = window.prompt('상품설명 입력');
        let newAuthor = window.prompt('작성자 입력');

        if (!newName || !newDesc || !newSrc || !newAuthor) {
            alert('필수항목을 입력하지 않으셨습니다');
            return;
        }

        const newPost = {
            name: newName,
            desc: newDesc,
            src: newSrc,
            author: newAuthor,
            date: getCurrentDate(),
            views: 0,
            likes: 0,
            comments: 0,
            isEdited: false,
        };

        const tmpgods = [...gods, newPost];
        setGoods(tmpgods);
        setDisplayedGoods(tmpgods); // UI 업데이트
    };

    //U
    const updatePost = (i) => {
        let newSrc = window.prompt('수정할 업로드할 상품 이미지 URL 입력', gods[i].src);
        let newName = window.prompt('상품명 수정', gods[i].name);
        let newDesc = window.prompt('상품설명 수정', gods[i].desc);

        const tmpgods = [...gods];
        tmpgods[i] = {
            ...tmpgods[i],
            name: newName,
            desc: newDesc,
            src: newSrc,
            date: getCurrentDate(),
            isEdited: true,
        };
        setGoods(tmpgods);
        setDisplayedGoods(tmpgods); // UI 업데이트
    };

    //D
    const deletePost = (i) => {
        const tmpgods = [...gods];
        tmpgods.splice(i, 1);
        setGoods(tmpgods);
        setDisplayedGoods(tmpgods); // UI 업데이트
    };

    // 검색 실행 (검색 버튼 클릭 시 실행)
    const handleSearch = () => {
        const filteredGoods = gods.filter(
            (obj) =>
                obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                obj.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setDisplayedGoods(filteredGoods);
    };

    return (
        <div>
            <h1 className="mt-5">패션정보</h1>
            <Row className="d-flex justify-content-end flex-md-row flex-column align-items-end align-items-md-center">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="검색어 입력 (제목/작성자)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
                <Col xs={12} className="d-flex flex-row justify-content-md-end justify-content-between mt-2 mt-md-0">
                    <Button variant="dark" onClick={handleSearch} className="m-2">
                        <IoSearch /> 검색
                    </Button>
                    <Button variant="dark" className="m-2">
                        정렬
                    </Button>
                </Col>
            </Row>
            <Container className="py-4">
                <Row>
                    <Col md={12}></Col>
                </Row>
                <Row className="mb-5">
                    {/* R(Read) - 게시글 표시 */}
                    {displayedGoods.map((obj, i) => (
                        <Col key={i} md={4} xs={12} lg={3} className="mx-5">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={obj.src} alt={obj.name} />
                                <Card.Body>
                                    <Card.Title>{obj.name}</Card.Title>
                                    <Card.Text>{obj.desc}</Card.Text>
                                    {/* 작성자, 날짜 */}
                                    <div className="text-muted small mb-2">
                                        <span>
                                            {obj.author} · {obj.date}
                                            {obj.isEdited ? '(수정됨)' : ''}
                                        </span>
                                    </div>

                                    {/* 조회수, 좋아요, 댓글 */}
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>
                                            <BsEye /> {obj.views}
                                        </span>
                                        <span>
                                            <FaHeart /> {obj.likes}
                                        </span>
                                        <span>
                                            <FaComment /> {obj.comments}
                                        </span>
                                    </div>

                                    {/* <Button variant="primary">상품 보러가기</Button> */}
                                    <Button variant="dark" onClick={() => updatePost(i)}>
                                        게시글 수정
                                    </Button>
                                    <Button variant="danger" onClick={() => deletePost(i)}>
                                        게시글 삭제
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col>
                        <Button variant="dark" onClick={addGoods} className="m-2">
                            게시글 등록
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
