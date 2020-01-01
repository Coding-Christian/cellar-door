import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [], error: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }
  getAllGrades() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(grades => this.setState({ grades }))
      .catch(error => this.setState({ error }));
  }
  async addNewGrade(grade) {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade)
    };
    try {
      const response = await fetch('/api/grades', config);
      this.getAllGrades();
      return response.status;
    } catch {
      this.getAllGrades();
      return 503;
    }
  }
  handleSubmit(name, course, grade) {
    const newGrade = { name, course, grade };
    return this.addNewGrade(newGrade);
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
  deleteGrade(gradeId) {
    fetch(`/api/grades/${gradeId}`, { method: 'DELETE' })
      .then(() => {
        const grades = this.state.grades.filter(grade => !(grade.id === gradeId));
        this.setState({ grades }, this.getAllGrades);
      })
      .catch(error => this.setState({ error }));
  }
  componentDidMount() {
    this.getAllGrades();
  }
  render() {
    return (
      <div className="sgt container mt-2">
        <Header title='Student Grade Table' averageGrade={this.getAverageGrade()}/>
        <div className="row">
          <GradeTable onDelete={this.deleteGrade} grades={this.state.grades}/>
          <GradeForm onSubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default App;
