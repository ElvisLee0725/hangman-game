import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Difficulty from './Difficulty';
import Question from './Question';
import Message from './Message';
import WinnerModal from './WinnerModal';

const Landing = () => {
  
  const [puzzle, setPuzzle] = useState('');
  const [guessLeft, setGuessLeft] = useState(5);
  const [gameStatus, setGameStatus] = useState('');
  const [message, setMessage] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [winnerModalShow, setWinnerModalShow] = useState(false);
  const winnerScore = useRef(0);
  const diffMulti = useRef(1);

  console.log('render');

  const fetchQuestion = (puzzleType = 'easy') => {
    axios.get(`/api/questions/${puzzleType}`).then((res) => {
      console.log(res.data.question);
      setGameStatus('playing');
      switch(puzzleType) {
        case 'easy':
          setGuessLeft(7);
          diffMulti.current = 2;
          break;

        case 'medium':
          setGuessLeft(5);
          diffMulti.current = 3;
          break;
        
        case 'hard':
          setGuessLeft(3);
          diffMulti.current = 4;
          break;

        default:
          break;
      }
      
      setPuzzle(res.data.question.toLowerCase());
      setGuessedLetters([]);
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
    if(winnerModalShow && gameStatus === 'winner') {
      console.log('stop the game');
      setGameStatus('game-stop');
    }
  }, [winnerModalShow]);

  useEffect(() => {
    fetchQuestion();
  }, []);
  
  useEffect(() => {
    window.addEventListener('keypress', makeGuess);

    // Calculate scores when the user wins, then show modal with score
    if(gameStatus === 'winner') {
      // 1 character with 5 scores, 1 guess left with 10 scores, multiply by the difficulty of puzzle
      winnerScore.current = (puzzle.replace(/\s/g, '').length * 5 + guessLeft * 10) * diffMulti.current;
      console.log('Got winner');
      setWinnerModalShow(true);
    }

    return () => {
      window.removeEventListener('keypress', makeGuess);
    }
  }, [puzzle, gameStatus, guessedLetters]);

  return (
    <Container>
      <h1>Hello! Welcome to play this game!</h1>
      <Difficulty fetchQuestion={fetchQuestion} />
      <Question puzzle={puzzle} guessLeft={guessLeft} guessedLetters={guessedLetters} setGameStatus={setGameStatus} setMessage={setMessage} gameStatus={gameStatus}/>
      <Message message={message} />
      <WinnerModal show={winnerModalShow} onHide={() => setWinnerModalShow(false)} score={winnerScore.current}/>
    </Container>
  );
}

export default Landing;