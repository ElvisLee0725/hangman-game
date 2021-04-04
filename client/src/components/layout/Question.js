import React, { useEffect, Fragment } from 'react';

const Question = ({ puzzle, guessLeft, guessedLetters, setGameStatus, setMessage, onShow }) => {
  
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
  }

  useEffect(() => {
    // Check if all characters are guessed
    if(puzzle && !questionArr.includes('*')) {
      setGameStatus('winner');
      setMessage('You got the answer! Great job!');
      onShow();
    }

    // Check if run out of guess
    if(guessLeft === 0) {
      setGameStatus('gameover');
      setMessage(`Sorry, the answer is '${puzzle.toUpperCase()}'. Let's play again!`);
    }
  }, [puzzle, questionArr, guessLeft]);
   
  return (
    <Fragment>
      <div className="text-center mt-5 mb-3">
        <div className="questionArea">
          { questionArr.map((ch, idx) => <span key={idx}>{ch}</span>) }
        </div> 
        <p className="my-3">Remaining Guesses: {guessLeft}</p>
      </div>
    </Fragment>
  );
}

export default Question;
