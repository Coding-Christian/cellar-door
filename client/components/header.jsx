import React from 'react';

function Header(props) {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-success mb-2'>
      <span style={{ fontFamily: 'Eagle Lake', cursor: 'default' }} className='navbar-brand'>{props.title}</span>
    </nav>
  );
}

export default Header;
