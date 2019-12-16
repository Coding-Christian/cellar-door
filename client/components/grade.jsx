import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td>
        <button onClick={() => props.onDelete(props.id)} className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  );
}

export default Grade;
