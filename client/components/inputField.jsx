import React from 'react';

function InputField(props) {
  let validClass = '';
  let errorClass = 'd-none';
  if (props.field.value.length !== 0 && props.field.isValid) {
    validClass = 'is-valid';
  } else if (props.field.value.length !== 0 && !props.field.isValid) {
    validClass = 'is-invalid';
    errorClass = 'd-block';
  }
  return (
    <>
      <div className='input-group mb-1'>
        <div className="input-group-prepend">
          <div className="input-group-text"><i className={props.faClass}></i></div>
        </div>
        <input
          onChange={props.handleChange}
          placeholder={props.field.title}
          value={props.field.value}
          className={`form-control ${validClass}`}
          type='text'
          id={props.id}
          required
        />
      </div>
      <small className={`text-danger ${errorClass}`}>{props.field.error}</small>
    </>
  );
}

export default InputField;
