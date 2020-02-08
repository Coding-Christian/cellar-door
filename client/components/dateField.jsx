import React from 'react';

function DateField(props) {
  return (
    <div className='input-group'>
      <div className="input-group-prepend">
        <div className="input-group-text" title={props.field.title}>
          <i className={props.faClass}></i>
        </div>
      </div>
      <input
        type="date"
        onChange={props.handleChange}
        value={props.field.value}
        className={`form-control`}
        id={props.id}
      />
    </div>
  );
}

export default DateField;
