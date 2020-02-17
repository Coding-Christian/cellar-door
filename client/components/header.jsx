import React from 'react';

function Header(props) {
  return (
    <nav className='navbar navbar-dark bg-success mb-2 justify-content-start'>
      <span style={{ fontFamily: 'Eagle Lake', cursor: 'default' }} className='navbar-brand'>{props.title}</span>
      <button onClick={() => props.changeView('groceries')} className={`btn btn-success mr-1 ${(props.view === 'groceries' ? 'active' : '')}`}>Groceries</button>
      <button onClick={() => props.changeView('locations')} className={`btn btn-success ${(props.view === 'locations' ? 'active' : '')}`}>Locations</button>
    </nav>
  );
}

export default Header;
