import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import './Timeline.css';
import {
  AiOutlineCloseCircle,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, deletePost, getPosts } from './timelineAPI';

const Timeline = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.timeline);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    name: '',
    photo: '',
    content_text: '',
    content_photo: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(input));
    setModal(false);
    setInput({ name: '', photo: '', content_text: '', content_photo: '' });
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div>
      <Container>
        <Row className='justify-content-center'>
          <Col md='5'>
            <Card className='my-2'>
              <Card.Body>
                <Button onClick={() => setModal(true)}>Add new Post</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md='5'>
            {[...posts].reverse().map((data, index) => (
              <Card className='my-2' key={index}>
                <Card.Body>
                  <div className='header d-flex align-items-center justify-content-between'>
                    <div className='header-left d-flex align-items-center'>
                      <img src={data.photo} alt='user' />
                      <div className='header-info'>
                        <h6>{data.name}</h6>
                        <p>2 hours ago</p>
                      </div>
                    </div>
                    <div className='header-right'>
                      <Button onClick={() => dispatch(deletePost(data.id))}>
                        <AiOutlineCloseCircle />
                      </Button>
                    </div>
                  </div>
                  <div className='content-text'>
                    <p className='my-2'>{data.content_text}</p>
                  </div>
                  <div className='content-photo'>
                    <img src={data.content_photo} alt='user' />
                  </div>
                  <div className='reactions d-flex align-items-center justify-content-between'>
                    <button>
                      <AiOutlineLike />
                    </button>
                    <button>
                      <AiOutlineDislike />
                    </button>
                    <button>
                      <FcLike />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      <Modal show={modal} onHide={() => setModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='text'
                value={input.name}
                onChange={handleInput}
                placeholder='Enter your name'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                name='photo'
                type='link'
                value={input.photo}
                onChange={handleInput}
                placeholder='Profile picture link'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Text</Form.Label>
              <Form.Control
                name='content_text'
                type='text'
                value={input.content_text}
                onChange={handleInput}
                placeholder='Enter your post text'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Post image</Form.Label>
              <Form.Control
                name='content_photo'
                type='link'
                value={input.content_photo}
                onChange={handleInput}
                placeholder='Give your content image link'
              />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Timeline;
