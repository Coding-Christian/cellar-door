import React from 'react';

function TextField(props) {
  return (
    <div className='input-group mb-1'>
      <div className="input-group-prepend">
        <div className="input-group-text"><i className={props.faClass}></i></div>
      </div>
      <textarea
        maxLength={256}
        rows={4}
        onChange={props.handleChange}
        placeholder={props.field.title}
        value={props.field.value}
        className={`form-control`}
        id={props.id}
      ></textarea>
    </div>
  );
}

export default TextField;
