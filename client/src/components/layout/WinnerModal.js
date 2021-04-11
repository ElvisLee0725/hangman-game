import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const WinnerModal = (props) => {
  const [playerName, setPlayerName] = useState('');

  const saveScore = async () => {
    const body = {
      name: playerName,
      score: props.score
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      await axios.post('/api/scores', JSON.stringify(body), config);
      props.onHide();
    } catch(error) {
      console.log(error);
    }
  }

  return (
    // Use animation={false} to remove Warning:findDOMNode is deprecated in StrictMode. However, modal loses animation
    <Modal {...props} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nice! You got the answer!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Total Score: {props.score}</h4>
        <Form>
          <Form.Group as={Row} controlId="formPlayerName">
            <Form.Label column sm={4}>
              Your Name:
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></Form.Control>
            </Col>
          </Form.Group>
          <div className="save-name-buttons">
            <Button variant="secondary" onClick={props.onHide} className="mr-2">Close</Button>
            <Button variant="primary" onClick={() => saveScore()}>Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default WinnerModal;