import React from 'react';

function Header(props) {
  return (
    <div className='row mb-4'>
      <h1 className='title d-none d-md-inline-block col-12 p-0'>{props.title}</h1>
      <h2 className='title d-inline-block d-md-none col-12 p-0'>{props.title}</h2>
    </div>
  );
}

export default Header;
