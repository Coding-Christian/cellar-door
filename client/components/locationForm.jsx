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
    this.onAdd = props.onAdd;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  validateForm() {
    const wordPatt = /[^\w\s]/g;
    let name = Object.assign(this.state.name);
    name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
    this.setState({ name });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.isValid) {
      const status = await this.onAdd({
        name: this.state.name.value,
        description: this.state.description.value
      });
      if (status < 300) {
        this.handleClear();
        this.setState({ advancedView: false });
      } else {
        this.setState({ error: 'Could not reach server. Please try again.' });
      }
    }
  }
  handleClear() {
    const newState = {
      name: Object.assign(this.state.name),
      description: { title: 'Description', value: '' }
    };
    newState.name.value = '';
    newState.name.isValid = false;
    this.setState(newState);
  }
  render() {
    return null;
  }
}

export default LocationForm;
