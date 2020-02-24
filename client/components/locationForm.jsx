import React from 'react';
import InputField from './inputField';
import TextField from './textField';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(event) {
    let newFieldState = Object.assign(this.state[event.target.id]);
    newFieldState.value = event.target.value;
    this.setState({ [event.target.id]: newFieldState }, this.validateForm);
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
    let disabledClass = '';
    if (!this.state.name.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='d-flex flex-column order-1 order-lg-2 mb-4 col-12 col-lg-3'>
        <p className="mb-1">Add new Location:</p>
        <div className="form-group mb-1">
          <InputField handleChange={this.handleChange} id='name' field={this.state.name} faClass='fas fa-pencil-alt'/>
          <TextField handleChange={this.handleChange} id='description' field={this.state.description} faClass='fas fa-sticky-note'/>
        </div>
        <div>
          <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
          <button type='button' onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2'>Clear</button>
        </div>
      </form>
    );
  }
}

export default LocationForm;
