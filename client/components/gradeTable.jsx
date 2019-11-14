import React from 'react';
import Grade from './grade';

function GradeTable(props) {
  let grades = props.grades.map(grade => (
    <Grade key ={grade.id} name={grade.name} course={grade.course} grade={grade.grade}/>
  ));
  return (
    <table className='table table-striped table-bordered col-6'>
      <thead className='thead-light'>
        <tr>
          <th>Student Name</th>
          <th>Course</th>
          <th>Grade</th>
        </tr>
      </thead>
      {grades}
    </table>
  );
}

export default GradeTable;
