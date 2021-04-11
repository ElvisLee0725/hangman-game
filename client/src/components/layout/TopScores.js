import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const TopScores = () => {
  const [topScores, setTopScores] = useState([]);
  
  const fetchScores = async () => {
    try {
      const scores = await axios.get('/api/scores');
      setTopScores([...scores.data]);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <Container>
      <h1 className='text-center my-5'>Top 10 Scores</h1>
      <Table striped variant='dark'>
        <thead className='table-header'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody className='table-text'>
          { topScores.map((s, i) => (<tr key={i}><td>{i+1}</td><td>{s.name}</td><td>{s.score}</td></tr>))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TopScores;
