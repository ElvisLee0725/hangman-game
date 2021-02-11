import React, { useEffect }from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Landing = () => {
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await axios.get('/api/questions/easy');
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestion();
  }, []);

  return (
    <Container>
      <h1>Hello! Welcome to play this game!</h1>
    </Container>
  )
}

export default Landing;