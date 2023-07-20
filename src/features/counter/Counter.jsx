import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './counterSlice';

const Counter = () => {
  const dispatch = useDispatch();

  const { value } = useSelector((state) => state.counter);
  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <Col md='4'>
            <Card className='mt-5'>
              <Card.Body>
                <Card.Title>Counter</Card.Title>
                <h1>{value}</h1>
                <Button className='me-2' onClick={() => dispatch(increment())}>
                  ++
                </Button>
                <Button variant='danger' onClick={() => dispatch(decrement())}>
                  --
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Counter;
