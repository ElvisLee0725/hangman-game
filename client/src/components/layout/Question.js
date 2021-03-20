import React, { Fragment } from 'react';

const Question = (props) => {
  const { question } = props;
  const questionArr = question.split('');
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
