import React from 'react';

function selectField(props) {
  let options;
  if (props.field.options.length) {
    options = props.field.options.map(option => (
      <option key={option.id} value={option.id}>{option.name}</option>
    ));
  } else {
    options = (<option value='0'>{`-- No ${props.id}s --`}</option>);
  }
  return (
    <div className='input-group mb-1'>
      <div className="input-group-prepend">
        <div className="input-group-text" title={props.field.title}>
          <i className={props.faClass}></i>
        </div>
      </div>
      <select
        onChange={props.handleChange}
        value={props.field.value}
        className={`form-control`}
        id={props.id}
      >
        {options}
      </select>
    </div>
  );
}

export default selectField;
