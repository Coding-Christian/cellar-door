import React from 'react';

function TextField(props) {
  let validClass = '';
  let errorClass = 'd-none';
  if (props.field.value.length !== 0 && props.field.isValid) {
    validClass = 'is-valid';
  } else if (props.field.value.length !== 0 && !props.field.isValid) {
    validClass = 'is-invalid';
    errorClass = 'd-block';
  }
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
        className={`form-control ${validClass}`}
        id={props.id}
      ></textarea>
      <small className={`text-danger ${errorClass}`}>{props.field.error}</small>
    </div>
  );
}

export default TextField;
