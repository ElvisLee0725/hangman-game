import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Difficulty from './Difficulty';
import Question from './Question';
import Message from './Message';
import WinnerModal from './WinnerModal';

const Landing = () => {
  
  const [puzzle, setPuzzle] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [message, setMessage] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [missedGuesses, setMissedGuesses] = useState([]);
  const [winnerModalShow, setWinnerModalShow] = useState(false);
  const [questionArr, setQuestionArr] = useState([]);
  const winnerScore = useRef(0);
  const diffMulti = useRef(1);
  const totalGuess = useRef(7);
  // console.log('render');

  const fetchQuestion = (puzzleType = 'easy') => {
    axios.get(`/api/questions/${puzzleType}`).then((res) => {
      switch(puzzleType) {
        case 'easy':
          diffMulti.current = 2;
          totalGuess.current = 7;
          break;

        case 'medium':
          diffMulti.current = 3;
          totalGuess.current = 5;
          break;
        
        case 'hard':
          diffMulti.current = 4;
          totalGuess.current = 3;
          break;

        default:
          break;
      }

      const newPuzzle = res.data.question.toLowerCase();

      setQuestionArr(newPuzzle.split('').map((ch) => ch === ' ' ? ' ' : '*'));
      setPuzzle(newPuzzle);
      setGuessedLetters([]);
      setMissedGuesses([]);
      setMessage('Game starts!');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if(guessedLetters.length === 0 && questionArr.length > 0) {
      setGameStatus('playing');
    }
  }, [guessedLetters, questionArr]);

  
  useEffect(() => {
    const makeGuess = (e) => {
      if(gameStatus !== 'playing') {
        return ;
      }
      let ch = e.key;

      // Check if the input not alphabetic or the Enter key
      if(ch.toLowerCase() === ch.toUpperCase() || ch === 'Enter') {
        setMessage('Please enter English alphabet only.');
        return ;
      }

      ch = ch.toLowerCase();
  
      // Made a repeat guess, return 
      if(guessedLetters.includes(ch) || missedGuesses.includes(ch)) {
        setMessage(`This letter '${ch.toUpperCase()}' has been guessed.`);
        return ;
      }

      const guessRight = puzzle.includes(ch);
      
      if(guessRight) {
        setGuessedLetters((prevArr) => [...prevArr, ch]);
        setMessage(`Correct! You got the letter '${ch.toUpperCase()}'.`);
      }
      else {
        setMissedGuesses((prevArr) => [...prevArr, ch]);
        setMessage(`'${ch.toUpperCase()}' is not in the puzzle, try another!`);
      }
    }
    window.addEventListener('keypress', makeGuess);

    return () => {
      window.removeEventListener('keypress', makeGuess);
    }
  }, [puzzle, guessedLetters, missedGuesses, gameStatus]);

  // Update Question Array to display when Guessed Letter array is updated
  useEffect(() => {
    setQuestionArr(puzzle.split('').map((ch) => {
        if(guessedLetters.includes(ch)) {
          return ch;
        }
        else if(ch ===  ' ') {
          return ' ';
        }
        return '*';
      }));
  }, [puzzle, guessedLetters]);

  // Change game status when the user guessed all letters, or used up all guesses
  useEffect(() => {
    // Check if all characters are guessed
    if(gameStatus === 'playing' && !questionArr.includes('*')) {
      setGameStatus('winner');
      setMessage('You got the answer! Great job!');
    }

    // Check if run out of guess
    if(gameStatus === 'playing' && (totalGuess.current - missedGuesses.length === 0)) {
      setGameStatus('gameover');
      setMessage(`Sorry, the answer is '${puzzle.toUpperCase()}'. Let's play again!`);
    }
  }, [questionArr, missedGuesses, gameStatus, puzzle]);

  // Calculate scores when the user wins, then show modal with score
  useEffect(() => {
  if(gameStatus === 'winner') {
    // 1 character with 5 scores, 1 guess left with 10 scores, multiply by the difficulty of puzzle
    winnerScore.current = (puzzle.replace(/\s/g, '').length * 5 + (totalGuess.current - missedGuesses.length) * 10) * diffMulti.current;
    setWinnerModalShow(true);
  }
}, [gameStatus, missedGuesses, puzzle]);

  const closeModal = () => {
    setWinnerModalShow(false);
    // Set game status to 'pending' when modal close. So it won't pop up before next game starts
    setGameStatus('pending');
  }

  console.log('Total: ' + totalGuess.current);
  console.log('Missied: ' + missedGuesses.length);
  console.log('Status: ' + gameStatus);

  return (
    <Container>
      <Difficulty fetchQuestion={fetchQuestion} />
      <Question questionArr={questionArr} guessLeft={totalGuess.current - missedGuesses.length} missedGuesses={missedGuesses}/>
      <Message message={message} />
      <WinnerModal show={winnerModalShow} onHide={() => closeModal()} score={winnerScore.current}/>
    </Container>
  );
}

export default Landing;