import React from 'react';
import Header from './header';

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
    return (<Header title='Student Grade Table'/>);
  }
}

export default App;
