import React, { Fragment } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const Difficulty = ({ fetchQuestion }) => {
  const gameLevel = [
    {
      title: "Easy",
      desc: "In this mode you can fail up to 7 times with a fairly easy question."
    },
    {
      title: "Medium",
      desc: "In this mode you can fail up to 5 times with a medium question."
    },
    {
      title: "Hard",
      desc: "In this mode you can fail up to 3 times with a crazy hard question."
    }
  ];
  return (
    <Fragment>
      <Row className="mt-5">
        { gameLevel.map((level) => (
          <Col xs="12" sm="4" key={level.title} >
            <Card>
              <Card.Body className="text-center">
                <Card.Title>{level.title}</Card.Title>
                <Card.Text className="text-justify">{level.desc}</Card.Text>
                <Button className="btn-primary-color" onClick={() => fetchQuestion(level.title.charAt(0).toLowerCase() + level.title.slice(1))}>Play</Button>
              </Card.Body>
            </Card>
          </Col>
        )) }
      </Row>
    </Fragment>
  );
}

export default Difficulty;
