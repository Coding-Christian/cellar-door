import React from 'react';
import Header from './header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [], error: '' };
  }
  render() {
    return (<Header title='Student Grade Table'/>);
  }
}

export default App;
