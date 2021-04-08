import React, { Fragment } from 'react';

const Question = ({ questionArr, guessLeft }) => {
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
