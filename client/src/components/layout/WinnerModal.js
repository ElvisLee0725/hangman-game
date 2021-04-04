import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WinnerModal = (props) => {

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>You got the answer!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Your total score: 342</h4>
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