import React from 'react';

function UpdateField(props) {
  return (
    <td>
      <input onChange={props.handleChange} type="text" value={props.value} id={props.id} />
    </td>
  );
}

export default UpdateField;
