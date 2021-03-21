import React, { useEffect, Fragment } from 'react';

const Question = (props) => {
  const { puzzle, guessedLetters, setGuessedLetters } = props;
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
    const makeGuess = (e) => {
      const ch = e.key;
      // Made a repeat guess, return 
      if(guessedLetters.includes(ch)) {
        console.log(`This letter ${ch} is guessed`);
        return ;
      }
      let guessRight = puzzle.includes(ch);
      // Made a right / wrong guess
      console.log('Word: ' + puzzle + ' ' + puzzle.length);
      console.log('ch: ' + ch + ' ' + guessRight);
      if(guessRight) {
          setGuessedLetters([...guessedLetters, ch]);
      }
      else {
        console.log('Wrong guess');
      }
    }

    window.addEventListener('keypress', makeGuess);

    return () => {
      window.removeEventListener('keypress', makeGuess);
    }
  }, [puzzle, guessedLetters, setGuessedLetters, ]);
   
  return (
    <Fragment>
      <div className="text-center my-5">
        <div className="questionArea">
          { questionArr.map((ch, idx) => <span key={idx}>{ch}</span>)}
        </div> 
      </div>
    </Fragment>
  );
}

export default Question;
