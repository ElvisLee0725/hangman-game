import React, { useEffect, Fragment } from 'react';

const Question = ({ puzzle, guessLeft, guessedLetters, gameStatus, setGameStatus }) => {
  
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

  useEffect(() => {
    // Check if all characters are guessed
    if(puzzle && !questionArr.includes('*')) {
      setGameStatus('winner');
      console.log('We have a winner');
    }

    // Check if run out of guess
    if(guessLeft === 0) {
      setGameStatus('gameover');
    }
  }, [puzzle, questionArr, guessLeft]);
   
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
