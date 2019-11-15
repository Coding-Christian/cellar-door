import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [], error: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  addNewGrade(grade) {
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade)
    }).then(response => response.json())
      .then(grade => this.setState({ grades: this.state.grades.concat(grade) }))
      .catch(error => this.setState({ error }));
  }
  handleSubmit(name, course, grade) {
    const newGrade = { name, course, grade };
    this.addNewGrade(newGrade);
  }
  getAverageGrade() {
    const grades = this.state.grades;
    if (grades.length === 0) { return 0; }
    let total = 0;
    for (let grade of grades) {
      total += grade.grade;
    }
    return Math.round(total / grades.length);
  }
  componentDidMount() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(grades => this.setState({ grades }))
      .catch(error => this.setState({ error }));
  }
  render() {
    const grades = this.state.grades;
    return (
      <div className="sgt container mt-2">
        <Header title='Student Grade Table' averageGrade={this.getAverageGrade()}/>
        <div className="row">
          <GradeTable grades={grades}/>
          <GradeForm onSubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default App;
