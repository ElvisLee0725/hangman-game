import React, { Fragment } from 'react';

const Question = ({ questionArr, guessLeft, missedGuesses }) => {
  return (
    <Fragment>
      <div className="text-center mt-5 mb-3">
        <div className="questionArea">
          { questionArr.map((ch, idx) => <span key={idx}>{ch}</span>) }
        </div> 
        <p className="mt-3">Remaining Guesses: {guessLeft}</p>
        <p>Missed Guesses: { missedGuesses.map((ch, idx) => <span key={idx}>{ch.toUpperCase()}{idx === missedGuesses.length-1 ? '' : ', ' }</span>) }</p>
      </div>
    </Fragment>
  );
}

export default Question;
