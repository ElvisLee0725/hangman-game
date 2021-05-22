import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const PuzzleFactory = () => {
  const [puzzleData, setPuzzleData] = useState({
    puzzle: '',
    level: 'Easy'
  });

  const { puzzle, level } = puzzleData;

  const [message, setMessage] = useState({
    type: '',
    contents: []
  });

  const handlePuzzle = (e) => {
    setPuzzleData({
      ...puzzleData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      question: puzzle,
      difficulty: level
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/questions', JSON.stringify(body), config);
      if(res.data._id) {
        setMessage({ type: 'success', contents: [`Puzzle "${res.data.question}" was added successfully!`] });
      }
    } catch(error) {
      const errors = error.response.data.errors;
      if(errors) {
        setMessage({ type: 'danger', contents: errors.map((err) => err.msg) });
      }
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
      <p>Think of a word, phrase or sentence. Proper nouns or slangs are not allowed.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId='formPuzzle'>
          <Form.Label column sm={3}>Puzzle: </Form.Label>
          <Col sm={9}>
            <Form.Control type='text' name='puzzle' value={puzzle} onChange={handlePuzzle}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formPuzzleLevel'>
          <Form.Label column sm={3}>Level: </Form.Label>
          <Col sm={9}>
            <Form.Control as='select' name='level' value={level} onChange={handlePuzzle}>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button type='submit' className="btn-primary-color">Submit</Button>
      </Form>
      <div className='mt-4'>
        { message.contents.map((msg, idx) => <Alert key={idx} variant={message.type}>{msg}</Alert>) }
      </div>
    </div>
  )
}

export default PuzzleFactory;