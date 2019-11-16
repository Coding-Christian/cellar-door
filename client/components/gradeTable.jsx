import React from 'react';
import Grade from './grade';

function GradeTable(props) {
  let grades = props.grades.map(grade => (
    <Grade key ={grade.id} onDelete={props.onDelete} name={grade.name} course={grade.course} grade={grade.grade}/>
  ));
  return (
    <table className='table table-striped table-bordered order-2 order-md-1 col-xs-12 col-md-9'>
      <thead className='thead-light'>
        <tr>
          <th>Student Name</th>
          <th>Course</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {grades}
      </tbody>
    </table>
  );
}

export default GradeTable;
