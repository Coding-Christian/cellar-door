import React from 'react';

function selectField(props) {
  const options = props.field.options.map(option => (
    <option key={option.id} value={option.id}>{option.unitName}</option>
  ));
  return (
    <div className='input-group mb-1'>
      <div className="input-group-prepend">
        <div className="input-group-text"><i className={props.faClass}></i></div>
      </div>
      <select onChange={props.handleChange} value={props.field.value} className={`form-control`} id={props.id}>
        {options}
      </select>
    </div>
  );
}

export default selectField;
