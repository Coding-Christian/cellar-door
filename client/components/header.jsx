import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <h2>Average Grade: {props.averageGrade}</h2>
    </div>
  );
}

export default Header;
