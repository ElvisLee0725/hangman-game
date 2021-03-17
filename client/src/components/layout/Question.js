import React, { Fragment } from 'react';

const Question = (props) => {
  const { question } = props;
  return (
    <Fragment>
      <div className="text-center my-5">
        {question}
      </div>
    </Fragment>
  );
}

export default Question;
