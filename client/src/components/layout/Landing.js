import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Difficulty from './Difficulty';
import Question from './Question';

const Landing = () => {
  
  const [puzzle, setPuzzle] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const fetchQuestion = () => {
      axios.get('/api/questions/easy').then((res) => {
      console.log(res.data.question);

      setPuzzle(res.data.question.toLowerCase());
      setGuessedLetters([]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  
  //const [numCanGuess, setNumCanGuess] = useState(9);

  return (
    <Container>
      <h1>Hello! Welcome to play this game!</h1>
      <Difficulty />
      <Question puzzle={puzzle} guessedLetters={guessedLetters} setGuessedLetters={setGuessedLetters}/>
    </Container>
  );
}

export default Landing;