import React from 'react';

function Header(props) {
  return (
    <div className='row mb-2'>
      <h1 className='title text-center text-sm-left col-12 p-0'>{props.title}</h1>
    </div>
  );
}

export default Header;
