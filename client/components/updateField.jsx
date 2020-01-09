import React from 'react';

function UpdateField(props) {
  let validClass = 'is-valid';
  let errorClass = 'd-none';
  if (!props.field.isValid) {
    validClass = 'is-invalid';
    errorClass = 'd-block';
  }
  return (
    <td>
      <input
        onChange={props.handleChange}
        placeholder={props.field.title}
        value={props.field.value}
        className={`form-control ${validClass}`}
        id={props.id}
        type="text"
      />
      <small className={`text-danger ${errorClass}`}>{props.field.error}</small>
    </td>
  );
}

export default UpdateField;
