// - 사용자들이 가성비, 최저가, 최고품질 등 자신의 인생템을 업로드하고 공유
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { goods } from '../../data-Fashion/FashionData';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaHeart, FaComment } from 'react-icons/fa';
import { BsEye } from 'react-icons/bs';
import axios from 'axios';

export default function FashionInformation() {
    //리액트가 실행될때 백엔드에서 데이터를 가져오기 ------
    const [gods, setGoods] = useState([]);
    const [displayedGoods, setDisplayedGoods] = useState([]); // 검색 결과 반영할 상태

    useEffect(() => {
        fetchGoods();
    }, []);

    const fetchGoods = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/posts');
            setGoods(res.data);
            setDisplayedGoods(res.data);
        } catch (error) {
            console.error('데이터를 불러오는 중 오류 발생:', error);
        }
    };
    // ---------------------------------------------------------

    const [searchQuery, setSearchQuery] = useState('');

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return '날짜 없음'; // 예외 처리

        const date = new Date(isoDate);
        date.setHours(date.getHours() + 9); // UTC → KST 변환

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    //C
    const addGoods = async () => {
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

        try {
            const res = await axios.post('http://localhost:5000/api/posts', newPost);
            setGoods([...gods, res.data]);
            setDisplayedGoods([...displayedGoods, res.data]);
        } catch (error) {
            console.error('게시글 등록 중 오류 발생:', error);
        }
    };

    //U
    const updatePost = async (id, index) => {
        let newSrc = window.prompt('수정할 상품 이미지 URL 입력', gods[index].src);
        let newName = window.prompt('상품명 수정', gods[index].name);
        let newDesc = window.prompt('상품설명 수정', gods[index].desc);

        if (!newName || !newDesc || !newSrc) {
            alert('입력값이 비어있습니다.');
            return;
        }

        const updatedPost = {
            ...gods[index],
            name: newName,
            desc: newDesc,
            src: newSrc,
            date: getCurrentDate(),
            isEdited: true,
        };

        try {
            await axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost);
            fetchGoods(); // 수정 후 데이터 다시 불러오기
        } catch (error) {
            console.error('게시글 수정 중 오류 발생:', error);
        }
    };

    //D
    const deletePost = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            fetchGoods(); // 삭제 후 데이터 다시 불러오기
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error);
        }
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
                                            {obj.author} · {formatDate(obj.date)}
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
                                    <Button variant="dark" onClick={() => updatePost(obj.id, i)}>
                                        게시글 수정
                                    </Button>
                                    <Button variant="danger" onClick={() => deletePost(obj.id)}>
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
