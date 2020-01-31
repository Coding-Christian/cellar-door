import React from 'react';

function Header(props) {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-success mb-2'>
      <span style={{ fontFamily: 'Eagle Lake', cursor: 'pointer' }} className='navbar-brand'>{props.title}</span>
      {/* <div className='navbar-nav'>
        <div style={{ cursor: 'pointer' }} className="nav-item nav-link">Home</div>
        <div style={{ cursor: 'pointer' }} className="nav-item nav-link">Categories</div>
        <div style={{ cursor: 'pointer' }} className="nav-item nav-link">Locations</div>
      </div> */}
    </nav>
  );
}

export default Header;
