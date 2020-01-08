import React from 'react';

function InputField(props) {
  return (
    <div className='input-group mb-2'>
      <div className="input-group-prepend">
        <div className="input-group-text"><i className={props.faClass}></i></div>
      </div>
      <input
        onChange={props.handleChange}
        placeholder={props.placeholder}
        value={props.value}
        className='form-control'
        type='text'
        id={props.id}
      />
    </div>
  );
}

export default InputField;
