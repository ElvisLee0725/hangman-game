import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WinnerModal = (props) => {
  
  return (
    // Use animation={false} to remove Warning:findDOMNode is deprecated in StrictMode. However, modal loses animation
    <Modal {...props} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>You got the answer!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Your total score: {props.score}</h4>
        <label>
          Enter your name:
          <input></input>
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WinnerModal;