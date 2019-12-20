import React from 'react';

function Header(props) {
  return (
    <div className="header mb-4">
      <h1 className='title d-none d-md-inline-block col-xs-12 col-md-6'>{props.title}</h1>
      <h2 className='title d-inline-block d-md-none col-xs-12 col-md-6'>{props.title}</h2>
      <h2 className='average-title d-inline-block text-xs-left text-md-right col-xs-12 col-md-6'>
        Average Grade
        <span className='average-grade badge badge-primary px-2 ml-2'>{props.averageGrade}</span>
      </h2>
    </div>
  );
}

export default Header;
