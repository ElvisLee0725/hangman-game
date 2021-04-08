import React, { useEffect, Fragment } from 'react';

const Question = ({ questionArr, guessLeft }) => {
  
  /*
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
    if(gameStatus === 'playing' && puzzle && questionArr.length > 0 && !questionArr.includes('*')) {
      console.log('Question Array: ', questionArr);
      setGameStatus('winner');
      setMessage('You got the answer! Great job!');
    }

    // Check if run out of guess
    if(gameStatus === 'playing' && guessLeft === 0) {
      setGameStatus('gameover');
      setMessage(`Sorry, the answer is '${puzzle.toUpperCase()}'. Let's play again!`);
    }
  }, [puzzle, questionArr, guessLeft]);
   */
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
