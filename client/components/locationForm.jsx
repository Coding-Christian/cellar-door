import React from 'react';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        title: 'Name',
        value: '',
        isValid: false,
        error: 'Name must be between 2 and 60 alphanumeric characters'
      },
      description: {
        title: 'Description',
        value: ''
      }
    };
  }
  render() {
    return null;
  }
}

export default LocationForm;
