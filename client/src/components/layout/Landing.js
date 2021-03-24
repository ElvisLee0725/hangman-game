import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Difficulty from './Difficulty';
import Question from './Question';

const Landing = () => {
  
  const [puzzle, setPuzzle] = useState('');
  const [guessLeft, setGuessLeft] = useState(5);
  const [gameStatus, setGameStatus] = useState('');

  const fetchQuestion = () => {
      axios.get('/api/questions/easy').then((res) => {
      console.log(res.data.question);

      setPuzzle(res.data.question.toLowerCase());
      setGuessLeft(5);
      setGameStatus('playing');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <Container>
      <h1>Hello! Welcome to play this game!</h1>
      <Difficulty />
      <Question puzzle={puzzle} guessLeft={guessLeft} setGuessLeft={setGuessLeft} gameStatus={gameStatus} setGameStatus={setGameStatus}/>
    </Container>
  );
}

export default Landing;