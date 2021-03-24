import React, { useEffect, useState, Fragment } from 'react';

const Question = ({ puzzle, guessLeft, setGuessLeft, gameStatus, setGameStatus }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  
  let questionArr = [];
  if(puzzle) {
    questionArr = puzzle.split('').map((ch) => {
      if(guessedLetters.includes(ch)) {
        return ch;
      }
      else if(ch ===  ' ') {
        return ' ';
      }
      return '*';
    });
    
    if(gameStatus === 'gameover') {
      // Show the puzzle when the game is over
      console.log('Game Over');
    }
  }

  const makeGuess = (e) => {
    console.log('status: ' + gameStatus);
    if(gameStatus !== 'playing') {
      return ;
    }
    const ch = e.key;
    // Made a repeat guess, return 
    if(guessedLetters.includes(ch)) {
      console.log(`This letter ${ch} is guessed`);
      return ;
    }
    let guessRight = puzzle.includes(ch);
    // Made a right / wrong guess
    console.log('Guessed: ' + guessedLetters + ' ' + guessedLetters.length);
    console.log('ch: ' + ch + ' ' + guessRight);
    if(guessRight) {
      setGuessedLetters([...guessedLetters, ch]);
    }
    else {
      setGuessLeft((prevState) => {
        if(prevState === 1) {
          setGameStatus('gameover');
          return 0;
        }
        else {
          return prevState - 1;
        }
      });
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', makeGuess);

    return () => {
      window.removeEventListener('keypress', makeGuess);
    }
  }, [puzzle, gameStatus, guessedLetters, setGuessedLetters]);
   
  return (
    <Fragment>
      <div className="text-center my-5">
        <div className="questionArea">
          { questionArr.map((ch, idx) => <span key={idx}>{ch}</span>) }
        </div> 
        <p className="my-3">Remaining Guesses: {guessLeft}</p>
      </div>
    </Fragment>
  );
}

export default Question;
