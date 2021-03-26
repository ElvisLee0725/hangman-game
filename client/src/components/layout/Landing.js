import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Difficulty from './Difficulty';
import Question from './Question';
import Message from './Message';

const Landing = () => {
  
  const [puzzle, setPuzzle] = useState('');
  const [guessLeft, setGuessLeft] = useState(5);
  const [gameStatus, setGameStatus] = useState('');
  const [message, setMessage] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const fetchQuestion = () => {
      axios.get('/api/questions/easy').then((res) => {
      console.log(res.data.question);

      setPuzzle(res.data.question.toLowerCase());
      setGuessLeft(5);
      setGuessedLetters([]);
      setGameStatus('playing');
      setMessage('Game starts!');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const makeGuess = (e) => {
    if(gameStatus !== 'playing') {
      return ;
    }
    const ch = e.key;

    // Made a repeat guess, return 
    if(guessedLetters.includes(ch)) {
      setMessage(`This letter '${ch.toUpperCase()}' has been guessed.`);
      return ;
    }
    let guessRight = puzzle.includes(ch);
    
    if(guessRight) {
      setGuessedLetters((prevArr) => [...prevArr, ch]);
      setMessage(`Correct! You got the letter '${ch.toUpperCase()}'.`);
    }
    else {
      setGuessLeft((prevState) => {
          return prevState - 1;
        });
      setMessage(`'${ch.toUpperCase()}' is not in the puzzle, try another!`);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, []);
  
  useEffect(() => {
    window.addEventListener('keypress', makeGuess);

    return () => {
      window.removeEventListener('keypress', makeGuess);
    }
  }, [puzzle, gameStatus, guessedLetters]);

  return (
    <Container>
      <h1>Hello! Welcome to play this game!</h1>
      <Difficulty />
      <Question puzzle={puzzle} guessLeft={guessLeft} guessedLetters={guessedLetters} setGameStatus={setGameStatus} setMessage={setMessage} />
      <Message message={message} />
    </Container>
  );
}

export default Landing;