import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [], error: '' };
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
      <div className="sgt">
        <Header title='Student Grade Table'/>
        <GradeTable grades={grades}/>
      </div>
    );
  }
}

export default App;
