import React from 'react';

const Message = ({message}) => {
  return (
    <div className='text-center messageArea'>
      { message }
    </div>
  );
}

export default Message;